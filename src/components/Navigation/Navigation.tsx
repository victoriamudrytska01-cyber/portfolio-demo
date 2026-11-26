"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./Navigation.css";

export type NavigationItem = {
  /** Текст пункту. */
  label: string;
  /** Куди веде пункт. */
  href: string;
};

export type NavigationProps = Omit<ComponentProps<"nav">, "children"> & {
  /** Пункти меню. */
  items: NavigationItem[];
  /** `href` активного пункту: він отримує `aria-current="page"`. */
  activeHref?: string;
  /** Додаткові елементи після пунктів (кнопка, перемикач мови). У вузькому меню йдуть під пунктами. */
  actions?: ReactNode;
  /** Доступна назва кнопки-бургера, коли меню закрите. */
  openLabel?: string;
  /** Доступна назва кнопки-бургера, коли меню відкрите. */
  closeLabel?: string;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas";

const linkBase = `rounded-control px-3 py-2 font-sans text-body underline underline-offset-4 transition ${focusRing}`;
const linkActive = "text-canvas decoration-current";
const linkIdle = "text-canvas decoration-transparent hover:decoration-current";

/**
 * Навігація сайту: пункти меню, а на вузькому екрані кнопка-бургер з меню поверх контенту.
 * Докладний опис, стани й приклад: вкладка Docs у Storybook.
 */
export function Navigation({
  items,
  activeHref,
  actions,
  openLabel = "Open menu",
  closeLabel = "Close menu",
  className,
  ...props
}: NavigationProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Escape закриває відкрите меню й повертає фокус на бургер.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Бургер відкриває й закриває меню та лишає фокус на собі (Safari сам не фокусує кнопку при кліку).
  const handleBurgerClick = () => {
    setOpen((value) => !value);
    burgerRef.current?.focus();
  };

  // Вибір пункту в меню закриває його й повертає фокус на бургер (одна подія на весь список).
  const handlePanelClick = (event: MouseEvent<HTMLUListElement>) => {
    if ((event.target as HTMLElement).closest("a")) {
      setOpen(false);
      burgerRef.current?.focus();
    }
  };

  const renderLinks = (onNavigate?: () => void, extra = "") =>
    items.map((item) => {
      const isActive = item.href === activeHref;
      return (
        <li key={item.href}>
          <a
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigate}
            className={[linkBase, isActive ? linkActive : linkIdle, extra].filter(Boolean).join(" ")}
          >
            {item.label}
          </a>
        </li>
      );
    });

  return (
    <nav
      {...props}
      className={["flex items-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Широкий екран: пункти й додаткові елементи в рядок. */}
      <div className="hidden items-center gap-6 md:flex">
        <ul className="flex items-center gap-6">{renderLinks()}</ul>
        {actions}
      </div>

      {/* Вузький екран: кнопка-бургер. */}
      <button
        ref={burgerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? closeLabel : openLabel}
        onClick={handleBurgerClick}
        className={`inline-flex items-center justify-center rounded-control p-3 text-canvas transition hover:bg-glow md:hidden ${focusRing}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="size-6"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Відкрите меню лежить поверх контенту (absolute), сторінку вниз не зсуває. Пункти розділені лише відступами. */}
      <div
        id={menuId}
        className={`${open ? "flex" : "hidden"} nav-panel absolute top-full z-10 flex-col gap-6 border-y border-canvas bg-accent px-8 py-6 md:hidden`}
      >
        <ul className="flex flex-col gap-4" onClick={handlePanelClick}>
          {renderLinks(undefined, "block font-serif italic text-lead")}
        </ul>
        {actions && <div className="flex flex-col items-start gap-4">{actions}</div>}
      </div>
    </nav>
  );
}
