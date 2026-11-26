import type { ComponentProps } from "react";
import "./LanguageSwitch.css";

export type Language = "EN" | "UA";

export type LanguageSwitchProps = Omit<ComponentProps<"div">, "onChange" | "children"> & {
  /** Активна мова: `EN` або `UA`. Позначається жирним `canvas` і `aria-current="true"`. */
  value: Language;
  /** Викликається, коли користувач вибирає мову. */
  onChange?: (language: Language) => void;
  /** Доступна назва групи кнопок. */
  label?: string;
  /** Доступна назва кнопки EN. */
  englishLabel?: string;
  /** Доступна назва кнопки UA. */
  ukrainianLabel?: string;
};

const buttonBase =
  "rounded-control px-3 py-2 font-sans text-body underline underline-offset-4 transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas";
// На вузькому екрані активна мова підкреслена й не жирна (як у мобільному меню старого сайту),
// на широкому жирна без підкреслення.
const buttonActive =
  "text-canvas decoration-current md:font-semibold md:decoration-transparent md:hover:decoration-current";
const buttonIdle = "lang-switch__muted decoration-transparent hover:decoration-current";

/**
 * Перемикач мови EN / UA. Докладний опис, стани й приклад: вкладка Docs у Storybook.
 */
export function LanguageSwitch({
  value,
  onChange,
  label = "Language",
  englishLabel = "English",
  ukrainianLabel = "Українська",
  className,
  ...props
}: LanguageSwitchProps) {
  const languages: { code: Language; name: string; lang: string }[] = [
    { code: "EN", name: englishLabel, lang: "en" },
    { code: "UA", name: ukrainianLabel, lang: "uk" },
  ];

  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      className={["inline-flex items-center", className].filter(Boolean).join(" ")}
    >
      {languages.map((language, index) => (
        <span key={language.code} className="inline-flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="lang-switch__muted font-sans text-body">
              /
            </span>
          )}
          <button
            type="button"
            lang={language.lang}
            aria-label={language.name}
            aria-current={value === language.code ? "true" : undefined}
            onClick={() => onChange?.(language.code)}
            className={[buttonBase, value === language.code ? buttonActive : buttonIdle].join(" ")}
          >
            {language.code}
          </button>
        </span>
      ))}
    </div>
  );
}
