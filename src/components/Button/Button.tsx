import { useId, type ComponentProps, type MouseEvent } from "react";
import "./Button.css";

export type ButtonProps = Omit<ComponentProps<"button">, "disabled"> & {
  /** Вигляд кнопки: `primary` (головна дія) або `secondary` (додаткова). */
  variant?: "primary" | "secondary";
  /** Розмір кнопки: `md` або `lg`. */
  size?: "md" | "lg";
  /** Стрілка, що з'являється при наведенні й фокусі. Місце під неї зарезервоване завжди. */
  withArrow?: boolean;
  /** Вимкнена кнопка: лишається у фокусі, але не спрацьовує. Позначається через `aria-disabled`. */
  disabled?: boolean;
  /** Видимий текст-пояснення під вимкненою кнопкою. Пов'язаний з кнопкою через `aria-describedby`, тож його озвучує й скрінрідер. */
  disabledReason?: string;
};

const base =
  "btn-fx group inline-flex items-center justify-center whitespace-nowrap rounded-control border font-sans transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "aria-disabled:cursor-not-allowed aria-disabled:border-line aria-disabled:bg-canvas aria-disabled:text-ink-muted";

const variants = {
  // Контур фокусу кольору фону, на якому стоїть кнопка: primary на canvas, secondary на світлому (accent).
  primary: "btn-fx--primary border-accent bg-accent font-medium text-canvas focus-visible:outline-accent",
  secondary: "btn-fx--secondary border-canvas bg-canvas font-normal text-ink focus-visible:outline-canvas",
} as const;

const sizes = {
  md: "px-8 py-3 text-body",
  lg: "btn-fx--lg px-8 py-3 text-body",
} as const;

/**
 * Кнопка дизайн-системи. Докладний опис, варіанти й приклад: вкладка Docs у Storybook.
 */
export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  disabled = false,
  disabledReason = "This action is currently unavailable.",
  className,
  children,
  onClick,
  onMouseMove,
  type = "button",
  ...props
}: ButtonProps) {
  const reasonId = useId();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // Світло за курсором: кладемо позицію миші в --mx і --my (їх читає Button.css).
  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
    onMouseMove?.(event);
  };

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        {...props}
        type={type}
        aria-disabled={disabled || undefined}
        aria-describedby={disabled ? reasonId : props["aria-describedby"]}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      >
        {/* Стрілка стоїть всередині мітки й не займає місця: у спокої текст по центру. */}
        <span className={withArrow ? "btn-fx__label btn-fx__label--arrow" : "btn-fx__label"}>
          {children}
          {withArrow && (
            <svg
              aria-hidden="true"
              viewBox="0 0 22 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="btn-fx__arrow"
            >
              <path d="M1 6h19M15 1.5 20 6l-5 4.5" />
            </svg>
          )}
        </span>
      </button>
      {disabled && (
        <span id={reasonId} className="font-sans text-caption text-ink-muted">
          {disabledReason}
        </span>
      )}
    </div>
  );
}
