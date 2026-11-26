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

const linkBase = `rounded-control py-2 font-sans text-nav underline underline-offset-4 transition ${focusRing}`;
// Пункти відкритого меню на вузькому екрані: великий курсив із засічками (розмір з токена
// text-heading, підлаштований під екран у Navigation.css).
const panelLinkBase = `nav-panel__link block rounded-control py-4 font-serif italic text-heading underline underline-offset-4 transition ${focusRing}`;
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

  const renderLinks = (panel = false) =>
    items.map((item) => {
      const isActive = item.href === activeHref;
      return (
        <li key={item.href}>
          <a
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[panel ? panelLinkBase : linkBase, isActive ? linkActive : linkIdle].join(" ")}
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
      <div className="hidden items-center gap-nav md:flex">
        <ul className="flex items-center gap-nav">{renderLinks()}</ul>
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
        className={`nav-burger inline-flex items-center justify-center rounded-control text-canvas transition hover:bg-glow md:hidden ${focusRing}`}
      >
        {/* Іконка зі старого сайту: три косі риски, а коли меню відкрите, хрестик. */}
        <svg aria-hidden="true" viewBox="0 0 36 24" fill="currentColor" className="h-6 w-auto">
          {open ? (
            <>
              <polygon points="4,14 8,10 32,10 28,14" transform="rotate(45 18 12)" />
              <polygon points="4,14 8,10 32,10 28,14" transform="rotate(-45 18 12)" />
            </>
          ) : (
            <>
              <polygon points="6,2 34,2 30,6 2,6" />
              <polygon points="2,6 6,2 11,2 7,6" className="fill-paper opacity-60" />
              <polygon points="19,10 34,10 30,14 15,14" />
              <polygon points="6,18 34,18 30,22 2,22" />
            </>
          )}
        </svg>
      </button>

      {/* Відкрите меню лежить поверх контенту (absolute), сторінку вниз не зсуває. Пункти розділені лише відступами. */}
      <div
        id={menuId}
        className={`${open ? "flex" : "hidden"} nav-panel absolute top-full z-10 flex-col gap-6 bg-paper px-4 pb-6 pt-4 md:hidden`}
      >
        <ul className="flex flex-col" onClick={handlePanelClick}>
          {renderLinks(true)}
        </ul>
        {/* В одному ряду: ліворуч кнопка, праворуч перемикач мови (порядок обернено відносно широкого екрана). */}
        {actions && (
          <div className="flex flex-row-reverse items-center justify-between gap-4">{actions}</div>
        )}
      </div>
    </nav>
  );
}
