"use client";

import Image from "next/image";
import { useEffect } from "react";
import dot from "@/assets/status-dot.svg";
import ribbon from "@/assets/ribbon-vm.png";
import { Button } from "@/components/Button/Button";
import { Header } from "@/components/Header/Header";
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";
import { home, name } from "@/content/home";
import { useLanguage } from "@/content/useLanguage";
import "./home.css";

/**
 * Головний екран: шапка (Logo, Navigation, LanguageSwitch, Button secondary) і перший екран
 * (заголовок, підзаголовок, кнопка, статус, стрічка VM). Збірка зі старого сайту з компонентів
 * дизайн-системи, лише з токенів.
 */
export function HomeScreen() {
  const [language, setLanguage] = useLanguage();
  const t = home[language];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  // Розділів «роботи» й «контакти» ще немає: кнопки ведуть до якорів, як на старому сайті.
  const goTo = (hash: string) => () => {
    window.location.hash = hash;
  };

  return (
    <>
      <Header
        name={name}
        role={t.role}
        logoHref="#top"
        navigationLabel="Main"
        openLabel={t.menuOpen}
        closeLabel={t.menuClose}
        items={[
          { label: t.work, href: "#work" },
          { label: t.about, href: "#about" },
        ]}
        actions={
          <>
            <LanguageSwitch value={language} onChange={setLanguage} label={t.langLabel} />
            <Button variant="secondary" onClick={goTo("#contacts")}>
              {t.touch}
            </Button>
          </>
        }
      />

      <main
        id="top"
        className="hero flex flex-col items-stretch justify-center gap-8 px-4 pb-8 lg:flex-row lg:items-center lg:px-gutter xl:gap-section"
      >
        <div className="hero__art order-first lg:order-last lg:flex-1">
          <div className="hero__art-crop relative aspect-ribbon overflow-hidden">
            <Image src={ribbon} alt={t.art} priority sizes="100vw" className="hero__art-img" />
          </div>
        </div>

        <div className="hero__copy flex flex-col items-start lg:shrink-0">
          <h1 className="flex flex-col font-normal">
            <span className="hero__strong font-display text-display text-ink">{t.title}</span>
            <span className="hero__italic font-serif text-heading italic text-ink">
              {t.italic.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </h1>
          <p className="hero__lead mt-6 font-sans text-body text-ink-muted md:text-lead">{t.lead}</p>
          <div className="hero__cta mt-8">
            <Button variant="primary" size="lg" withArrow onClick={goTo("#work")}>
              {t.cta}
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-3 font-sans text-caption text-ink-muted">
            <Image src={dot} alt="" className="size-3" />
            {t.status}
          </p>
        </div>
      </main>
    </>
  );
}
