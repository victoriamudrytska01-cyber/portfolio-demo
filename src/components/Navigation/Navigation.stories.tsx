import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { Navigation } from "./Navigation";

// Пункти меню зі старого сайту: «My work», «About me»; кнопка «Get in touch» стоїть в actions.
const items = [
  { label: "My work", href: "#work" },
  { label: "About me", href: "#about" },
];

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  decorators: [
    // Навігація задумана для фону canvas: показуємо її на ньому.
    (Story) => (
      <div className="w-full bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
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

- **Пункт, default**: текст \`ink-muted\`, без підкреслення.
- **Hover**: текст \`ink\`, з'являється підкреслення.
- **Focus** (клавіатура): контур \`accent\` із відступом.
- **Активний пункт** (\`aria-current="page"\`): текст \`ink\` і постійне підкреслення. У Storybook перемикається в Controls.
- **Вузький екран** (до ширини \`md\`): пункти ховаються, з'являється кнопка-бургер з \`aria-expanded\`, \`aria-controls\` і доступною назвою (змінюється, коли меню відкрите). Відкрите меню лежить поверх контенту на заливці \`surface\` з межею \`line\`, пункти розділені лише відступами, без ліній. Меню закривається клавішею Escape (фокус повертається на бургер) і після вибору пункту.
- Перевірити вузький екран у Storybook можна через Viewport у панелі інструментів.

### Токени

Кольори: \`ink\`, \`ink-muted\`, \`accent\`, \`surface\`, \`line\`. Радіуси: \`rounded-control\`, \`rounded-card\`. Текст: \`text-body\`, у вузькому меню \`text-lead\` курсивом \`font-serif\`. Відступи: \`2\`, \`3\`, \`4\`, \`6\`. Контраст пар перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens: \`ink-muted\` на \`canvas\` 8,51:1, \`ink\` на \`canvas\` 15,28:1, \`ink\` на \`surface\` 13,70:1, \`ink-muted\` на \`surface\` 7,63:1.

### Коли використовувати

- Одна навігація на сторінку, у шапці.
- Активним став пункт сторінки, на якій користувач зараз.
- Не клади в \`items\` кнопки дій: для них є \`actions\`.
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
  actions={<Button variant="secondary">Get in touch</Button>}
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
    actions: <Button variant="secondary">Get in touch</Button>,
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
