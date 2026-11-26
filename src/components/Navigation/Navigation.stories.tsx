import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
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
    // Шапка сайту світла: показуємо навігацію на фоні accent. Вертикальні відступи 24 px
    // (крок 6) дають смужку заввишки близько 96 px, як на старому сайті.
    (Story) => (
      <div className="w-full bg-accent px-8 py-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Навігація займає всю ширину шапки: без цього в центрованому макеті вона стискається до розміру бургера.
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Меню сайту: «My work», «About me» і додаткові елементи (кнопка «Get in touch», перемикач мови). На широкому екрані пункти йдуть у рядок, на вузькому меню згортається в кнопку-бургер, а відкрите меню лежить поверх контенту й не зсуває сторінку вниз.

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
- **Вузький екран** (до ширини \`md\`): пункти ховаються, з'являється кнопка-бургер з \`aria-expanded\`, \`aria-controls\` і доступною назвою (змінюється, коли меню відкрите). Відкрите меню лежить поверх контенту на заливці \`accent\` з межею \`canvas\`, пункти розділені лише відступами, без ліній. Меню закривається клавішею Escape (фокус повертається на бургер) і після вибору пункту.
- Перевірити вузький екран у Storybook можна через Viewport у панелі інструментів.

### Токени

Кольори: \`canvas\` (текст), \`accent\` (фон), \`glow\` (фон бургера при наведенні). Радіуси: \`rounded-control\`, \`rounded-card\`. Текст: \`text-body\`, у вузькому меню \`text-lead\` курсивом \`font-serif\`. Відступи: \`2\`, \`3\`, \`4\`, \`6\`. Контраст: \`canvas\` на \`accent\` 14,37:1, \`canvas\` на \`glow\` 8,25:1 (обидві пари є в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens).

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
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
