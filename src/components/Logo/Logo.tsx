import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import mark from "@/assets/logo-vm.png";
import "./Logo.css";

export type LogoProps = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  /** Показувати ім'я й роль поруч зі знаком. Якщо `false`, лише знак. */
  showName?: boolean;
  /** Ім'я. */
  name?: string;
  /** Роль під іменем. */
  role?: string;
  /** Куди веде логотип: початок сторінки. */
  href?: string;
  /** Доступна назва посилання, коли показано лише знак. За замовчуванням: ім'я. */
  label?: string;
};

const link =
  "group inline-flex items-center gap-4 rounded-control text-canvas " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas";

/**
 * Логотип у шапці: знак VM, за потреби з іменем і роллю. Це посилання на початок сторінки.
 * Докладний опис, стани й приклад: вкладка Docs у Storybook.
 */
export function Logo({
  showName = true,
  name = "Victoria Mudrytska",
  role = "UX/UI Designer",
  href = "/",
  label,
  className,
  ...props
}: LogoProps) {
  return (
    <Link
      {...props}
      href={href}
      // З видимим іменем посилання отримує назву з тексту, а зі знаком без імені потрібен aria-label.
      aria-label={showName ? props["aria-label"] : (label ?? name)}
      className={[link, className].filter(Boolean).join(" ")}
    >
      <span className="logo__mark relative aspect-logo shrink-0 transition group-hover:opacity-80">
        <Image src={mark} alt="" fill sizes="100vw" className="object-contain" />
      </span>
      {showName && (
        <span className="flex flex-col">
          <span className="whitespace-nowrap font-serif text-lead font-bold underline decoration-transparent underline-offset-4 transition group-hover:decoration-current">
            {name}
          </span>
          <span className="font-sans text-caption">{role}</span>
        </span>
      )}
    </Link>
  );
}
