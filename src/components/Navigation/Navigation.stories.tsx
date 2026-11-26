import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { LanguageSwitch, type Language } from "../LanguageSwitch/LanguageSwitch";
import { Navigation } from "./Navigation";

// Пункти меню зі старого сайту: «My work», «About me». Перемикач мови й темна кнопка «Get in touch»
// стоять в actions, як у шапці старого сайту.
const items = [
  { label: "My work", href: "#work" },
  { label: "About me", href: "#about" },
];

function NavigationActions() {
  const [language, setLanguage] = useState<Language>("EN");
  return (
    <>
      <LanguageSwitch value={language} onChange={setLanguage} />
      <Button variant="secondary">Get in touch</Button>
    </>
  );
}

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  decorators: [
    // Під світлою шапкою (accent) темна сторінка (canvas), як на сайті.
    (Story) => (
      <div className="bg-canvas">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Шапка займає всю ширину сторінки.
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Меню сайту: «My work», «About me» і додаткові елементи (перемикач мови, кнопка «Get in touch»). На широкому екрані пункти йдуть у рядок, на вузькому меню згортається в кнопку-бургер, а відкрите меню лежить поверх контенту й не зсуває сторінку вниз.

Історія показує навігацію в складі шапки, як на старому сайті: смужка на всю ширину (заливка \`accent\`, висота 96 px, вертикальні відступи 16 px, бічні поля за токеном \`gutter\`, як на старому сайті), ліворуч логотип (компонент Logo), праворуч в один ряд пункти меню, перемикач мови (LanguageSwitch) і кнопка «Get in touch» (Button \`secondary\`). Усе по центру по вертикалі. Мобільну версію дивіться через Viewport.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`items\` | пункти: \`label\` і \`href\` (обов'язковий) | немає |
| \`activeHref\` | \`href\` активного пункту, отримує \`aria-current="page"\` | немає активного |
| \`actions\` | додаткові елементи після пунктів (кнопка, перемикач мови) | немає |
| \`openLabel\` | доступна назва бургера, коли меню закрите | англійською: відкрити меню |
| \`closeLabel\` | доступна назва бургера, коли меню відкрите | англійською: закрити меню |

Решта атрибутів \`nav\` (\`aria-label\`) передаються далі.

### Варіанти і стани

- Навігація призначена для світлої шапки (фон \`accent\`), як на старому сайті, тому всі пункти мають темний текст \`canvas\`. У Storybook вона показана на \`accent\` разом із перемикачем мови й темною кнопкою «Get in touch» (\`secondary\`). Світла кремова кнопка \`primary\` у навігації не використовується.
- **Пункт, default**: текст \`canvas\`, без підкреслення.
- **Hover**: з'являється підкреслення.
- **Focus** (клавіатура): контур \`canvas\` із відступом.
- **Активний пункт** (\`aria-current="page"\`): текст \`canvas\` і постійне підкреслення. У Storybook перемикається в Controls.
- **Вузький екран** (до ширини \`md\`), як на мобільній версії старого сайту. Закрита шапка: ліворуч логотип, праворуч кнопка-бургер 48 на 48 px з іконкою з трьох косих рисок, \`aria-expanded\`, \`aria-controls\` і доступною назвою («Відкрити меню» в історії), видимий контур \`canvas\` при фокусі з клавіатури. Бічні поля шапки 16 px, під шапкою тонка лінія кольору \`canvas\` з тими самими бічними відступами.
- **Відкрите меню**: бургер стає хрестиком, назва «Закрити меню». Меню лежить поверх контенту (сторінку вниз не зсуває) на всю ширину шапки, заливка \`accent\`, текст \`canvas\`. Воно позиціонується від найближчого предка з \`relative\`, тому шапка має бути \`relative\`. Пункти великим курсивом із засічками (\`font-serif\`, розмір 7/12 від токена \`text-heading\`, 28 px), між ними лише відступи, без ліній (на старому сайті лінії є, ми їх прибрали заради контрасту). Нижче в одному ряду: ліворуч темна кнопка «Get in touch», праворуч перемикач мови, активна мова підкреслена. Нижній правий кут меню зрізаний навскіс на 44 px (\`clip-path\` з токенів відступів). Меню закривається клавішею Escape, кліком на пункт і повторним натиском на бургер, фокус повертається на бургер.
- Перевірити вузький екран у Storybook можна через Viewport у панелі інструментів.

### Токени

Кольори: \`canvas\` (текст), \`accent\` (фон), \`glow\` (фон бургера при наведенні). Радіуси: \`rounded-control\`, \`rounded-card\`. Текст: \`text-body\`, у вузькому меню \`text-heading\` курсивом \`font-serif\` (розмір зменшений до 7/12 в \`Navigation.css\`). Відступи: \`3\`, \`4\`, \`6\` (кут зрізу 44 px це \`8\` плюс \`3\`, бургер 48 px це дві \`6\`). Контраст: \`canvas\` на \`accent\` 14,37:1, \`canvas\` на \`glow\` 8,25:1 (обидві пари є в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens).

### Коли використовувати

- Одна навігація на сторінку, у шапці.
- Активним став пункт сторінки, на якій користувач зараз.
- Не клади в \`items\` кнопки дій: для них є \`actions\`.
- Став навігацію на світлий фон \`accent\`: на темному текст \`canvas\` не читається.
- Не додавай ліній між пунктами меню, лише відступи.

### Як взяти в код

\`\`\`tsx
import { Navigation } from "@/components/Navigation/Navigation";

<Navigation
  aria-label="Main"
  items={[
    { label: "My work", href: "#work" },
    { label: "About me", href: "#about" },
  ]}
  activeHref="#work"
  actions={
    <>
      <LanguageSwitch value={language} onChange={setLanguage} />
      <Button variant="secondary">Get in touch</Button>
    </>
  }
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    activeHref: {
      control: "select",
      options: ["none", "#work", "#about"],
      mapping: { none: undefined, "#work": "#work", "#about": "#about" },
    },
    items: { control: false },
    actions: { control: false },
  },
  args: {
    "aria-label": "Main",
    items,
    activeHref: "#work",
    actions: <NavigationActions />,
    openLabel: "Відкрити меню",
    closeLabel: "Закрити меню",
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Навігація показана в складі шапки: логотип ліворуч, меню праворуч.
export const Playground: Story = {
  render: ({ items, activeHref, actions, openLabel, closeLabel }) => (
    <Header
      items={items}
      activeHref={activeHref}
      actions={actions}
      openLabel={openLabel}
      closeLabel={closeLabel}
      logoHref="#top"
    />
  ),
};
