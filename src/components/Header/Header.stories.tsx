import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "../Button/Button";
import { LanguageSwitch, type Language } from "../LanguageSwitch/LanguageSwitch";
import { Header } from "./Header";

// Пункти меню зі старого сайту. Перемикач мови й темна кнопка «Get in touch» стоять в actions.
const items = [
  { label: "My work", href: "#work" },
  { label: "About me", href: "#about" },
];

function HeaderActions() {
  const [language, setLanguage] = useState<Language>("EN");
  return (
    <>
      <LanguageSwitch value={language} onChange={setLanguage} />
      <Button variant="secondary">Get in touch</Button>
    </>
  );
}

const meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    // Під шапкою темна сторінка (canvas), як на сайті.
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
Шапка сайту на всю ширину, світла (заливка \`accent\`). Ліворуч логотип (знак VM, ім'я й підпис), праворуч у ряд пункти меню, перемикач мови й кнопка «Get in touch». Вміст вирівняний по краях за токеном \`content\`. На вузькому екрані праворуч лишається кнопка-бургер, а логотип ліворуч.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`items\` | пункти меню: \`label\` і \`href\` (обов'язковий) | немає |
| \`activeHref\` | \`href\` активного пункту | немає активного |
| \`actions\` | елементи після пунктів: перемикач мови, кнопка | немає |
| \`name\` | ім'я в логотипі | Victoria Mudrytska |
| \`role\` | підпис під іменем | UX/UI Designer |
| \`logoHref\` | куди веде логотип | \`/\` |
| \`navigationLabel\` | доступна назва навігації | англійською: головна навігація |
| \`openLabel\`, \`closeLabel\` | доступні назви бургера | англійською |

### Варіанти і стани

- **Широкий екран**: логотип притиснутий до лівого краю контенту, праворуч у ряд пункти, перемикач мови й кнопка, притиснуті до правого краю. Логотип і права група на одній висоті, по центру по вертикалі. Висота шапки близько 100 px.
- **Вузький екран** (до ширини \`md\`): логотип ліворуч, бургер праворуч. Відкрите меню лежить поверх контенту на всю ширину шапки й не зсуває сторінку.
- Стани логотипа, пунктів, перемикача мови й кнопки описані в Docs їхніх компонентів.
- Перевірити вузький екран можна через Viewport у панелі інструментів Storybook.

### Токени

Кольори: \`accent\` (фон), \`canvas\` (текст), усередині ще \`glow\` та інші токени вкладених компонентів. Ширина контенту: \`max-w-content\`. Відступи: \`6\` (вертикальні й між логотипом і навігацією), \`8\` (бічні поля). Контраст: \`canvas\` на \`accent\` 14,37:1 (пара є в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens).

### Коли використовувати

- Одна шапка на сторінку, на початку.
- Пункти меню й дії передавай через \`items\` і \`actions\`, не клади їх у логотип.
- Шапка вже \`relative\`: не прибирай це, інакше мобільне меню позиціонуватиметься неправильно.

### Як взяти в код

\`\`\`tsx
import { Header } from "@/components/Header/Header";

<Header
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
    name: { control: "text" },
    role: { control: "text" },
    items: { control: false },
    actions: { control: false },
  },
  args: {
    items,
    activeHref: "#work",
    actions: <HeaderActions />,
    logoHref: "#top",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
