import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

export type WorkCardProps = Omit<ComponentProps<typeof Link>, "href" | "children" | "title"> & {
  /** Назва роботи. */
  title: string;
  /** Короткий опис: одне-два речення, обрізається після трьох рядків. */
  description: string;
  /** Куди веде картка (сторінка кейсу). */
  href: string;
  /** Обкладинка: картинка з теки `assets`, імпортована в код. */
  image: StaticImageData;
  /** Опис обкладинки для скрінрідера. За замовчуванням порожній: обкладинка декоративна, назва поруч. */
  imageAlt?: string;
};

const card =
  "group block w-full overflow-hidden rounded-card border border-line bg-surface font-sans " +
  "transition hover:border-ink-muted " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/**
 * Картка роботи: обкладинка, назва, короткий опис. Уся картка є посиланням.
 * Докладний опис, стани й приклад: вкладка Docs у Storybook.
 */
export function WorkCard({
  title,
  description,
  href,
  image,
  imageAlt = "",
  className,
  ...props
}: WorkCardProps) {
  return (
    <Link {...props} href={href} className={[card, className].filter(Boolean).join(" ")}>
      <div className="relative aspect-cover overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover transition duration-300 ease-out motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-lead font-medium text-ink transition group-hover:text-accent">
          {title}
        </h3>
        <p className="line-clamp-3 text-body text-ink-muted">{description}</p>
      </div>
    </Link>
  );
}
