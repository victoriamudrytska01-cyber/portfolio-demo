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
Шапка сайту на всю ширину, світла (заливка \`accent\`). Ліворуч логотип (знак VM, ім'я й підпис), праворуч у ряд пункти меню, перемикач мови й кнопка «Get in touch». Бічні поля шапки дорівнюють токену \`gutter\` (від 32 до 64 px залежно від ширини екрана, як на старому сайті), і тим самим відступом має починатися вміст сторінки. На вузькому екрані праворуч лишається кнопка-бургер, а логотип ліворуч.

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

- **Широкий екран**: логотип притиснутий до лівого краю контенту, праворуч у ряд пункти, перемикач мови й кнопка, притиснуті до правого краю. Логотип і права група на одній висоті, по центру по вертикалі. Висота шапки задана токеном \`header\` (від 84 до 120 px залежно від висоти вікна, як на старому сайті: на вікні заввишки 826 px це 87 px, на 1080 px 113 px), вертикальні відступи 16 px. Проміжки між пунктами меню, перемикачем мови й кнопкою задає токен \`nav\` (від 28 до 56 px залежно від ширини вікна).
- **Вузький екран** (до ширини \`md\`): логотип ліворуч, бургер праворуч, бічні поля 16 px. Висоту (близько 80 px) дає вміст, під шапкою тонка лінія кольору \`canvas\` з бічними відступами 16 px. Відкрите меню лежить поверх контенту на всю ширину шапки й не зсуває сторінку, його вигляд описаний у Docs компонента Navigation.
- Стани логотипа, пунктів, перемикача мови й кнопки описані в Docs їхніх компонентів.
- Перевірити вузький екран можна через Viewport у панелі інструментів Storybook.

### Токени

Кольори: \`accent\` (фон), \`canvas\` (текст), усередині ще \`glow\` та інші токени вкладених компонентів. Бічне поле: \`gutter\` (\`px-gutter\`). Відступи: \`4\` (вертикальні й бічні на вузькому екрані), \`6\` (між логотипом і навігацією на широкому), \`8\` (мінімальна висота смужки). Контраст: \`canvas\` на \`accent\` 14,37:1 (пара є в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens).

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
    openLabel: "Відкрити меню",
    closeLabel: "Закрити меню",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
