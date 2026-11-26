import { useId, type ComponentProps } from "react";

export type FormFieldProps = Omit<ComponentProps<"input">, "id" | "disabled"> & {
  /** Підпис над полем. Зв'язаний з полем через `htmlFor` і `id`. */
  label: string;
  /** `id` поля. Якщо не задати, створюється автоматично. */
  id?: string;
  /** Стан помилки: межа `danger`, іконка, `aria-invalid`. */
  invalid?: boolean;
  /** Текст помилки під полем. Показується, коли `invalid`. Зв'язаний з полем через `aria-describedby`. */
  errorMessage?: string;
  /** Вимкнене поле: лишається у фокусі, текст не змінюється. Позначається через `aria-disabled`. */
  disabled?: boolean;
  /** Видимий текст-пояснення під вимкненим полем. Зв'язаний з полем через `aria-describedby`. */
  disabledReason?: string;
};

const inputBase =
  "w-full rounded-control border bg-surface px-4 py-3 font-sans text-body text-ink " +
  "placeholder:text-ink-muted transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "aria-disabled:cursor-not-allowed aria-disabled:border-line aria-disabled:bg-canvas aria-disabled:text-ink-muted";

const borderDefault = "border-ink-muted not-aria-disabled:hover:border-ink";
const borderInvalid = "border-danger";

/**
 * Текстове поле з підписом. Докладний опис, стани й приклад: вкладка Docs у Storybook.
 */
export function FormField({
  label,
  id,
  invalid = false,
  errorMessage,
  disabled = false,
  disabledReason = "This field is currently unavailable.",
  className,
  type = "text",
  readOnly,
  ...props
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const reasonId = `${fieldId}-reason`;

  const showError = invalid && Boolean(errorMessage);
  const describedBy =
    [showError && errorId, disabled && reasonId, props["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={fieldId} className="font-sans text-caption font-medium text-ink">
        {label}
      </label>
      <input
        {...props}
        id={fieldId}
        type={type}
        // Вимкнене поле лишається у фокусі (aria-disabled), а readOnly не дає змінити значення.
        readOnly={disabled || readOnly}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={[inputBase, invalid ? borderInvalid : borderDefault, className]
          .filter(Boolean)
          .join(" ")}
      />
      {showError && (
        <p id={errorId} className="flex items-start gap-2 font-sans text-caption text-danger">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="size-4 shrink-0"
          >
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 4.5v4M8 11h.01" />
          </svg>
          <span>{errorMessage}</span>
        </p>
      )}
      {disabled && (
        <p id={reasonId} className="font-sans text-caption text-ink-muted">
          {disabledReason}
        </p>
      )}
    </div>
  );
}
