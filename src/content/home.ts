// Тексти головного екрана зі старого сайту (portfolio/src/Home.tsx), англійською (основна) і українською.
export type Language = "EN" | "UA";

export const name = "Victoria Mudrytska";

export const home = {
  EN: {
    htmlLang: "en",
    role: "UX/UI Designer",
    work: "My work",
    about: "About me",
    touch: "Get in touch",
    title: "I design",
    italic: ["mobile apps and", "websites where the path", "is easy to follow"],
    lead: "For companies whose users go from choice to result without extra steps.",
    cta: "View my work",
    status: "Looking for a junior position or internship.",
    art: "Paper ribbon shaped like the letters VM",
    langLabel: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  UA: {
    htmlLang: "uk",
    role: "UX/UI дизайнерка",
    work: "Мої роботи",
    about: "Про мене",
    touch: "Зв'язатися",
    title: "Створюю",
    italic: ["мобільні застосунки", "й сайти, де шлях", "легко пройти"],
    lead: "Для компаній, чиї користувачі йдуть від вибору до результату без зайвих кроків.",
    cta: "Переглянути роботи",
    status: "Шукаю junior-позицію або стажування.",
    art: "Паперова стрічка у формі літер VM",
    langLabel: "Мова",
    menuOpen: "Відкрити меню",
    menuClose: "Закрити меню",
  },
} as const;
