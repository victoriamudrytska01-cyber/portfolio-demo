import type { ComponentProps, ReactNode } from "react";
import "./Header.css";
import { Logo } from "../Logo/Logo";
import { Navigation, type NavigationItem } from "../Navigation/Navigation";

export type HeaderProps = Omit<ComponentProps<"header">, "children"> & {
  /** Пункти меню. */
  items: NavigationItem[];
  /** `href` активного пункту. */
  activeHref?: string;
  /** Елементи після пунктів: перемикач мови, кнопка «Get in touch». */
  actions?: ReactNode;
  /** Ім'я в логотипі. */
  name?: string;
  /** Підпис під іменем у логотипі. */
  role?: string;
  /** Куди веде логотип. */
  logoHref?: string;
  /** Доступна назва навігації. */
  navigationLabel?: string;
  /** Доступна назва бургера, коли меню закрите. */
  openLabel?: string;
  /** Доступна назва бургера, коли меню відкрите. */
  closeLabel?: string;
};

/**
 * Шапка сайту: логотип ліворуч, навігація праворуч. Докладний опис, стани й приклад:
 * вкладка Docs у Storybook.
 */
export function Header({
  items,
  activeHref,
  actions,
  name,
  role,
  logoHref,
  navigationLabel = "Main",
  openLabel,
  closeLabel,
  className,
  ...props
}: HeaderProps) {
  return (
    // relative потрібен, щоб відкрите меню на вузькому екрані розкривалось на всю ширину шапки.
    <header {...props} className={["relative w-full bg-accent", className].filter(Boolean).join(" ")}>
      <div className="header__row flex items-center justify-between gap-4 px-4 py-4 md:gap-6 md:px-gutter md:py-3">
        <Logo name={name} role={role} href={logoHref} />
        <Navigation
          aria-label={navigationLabel}
          items={items}
          activeHref={activeHref}
          actions={actions}
          openLabel={openLabel}
          closeLabel={closeLabel}
        />
      </div>
      <div className="header__rule" aria-hidden="true" />
    </header>
  );
}
