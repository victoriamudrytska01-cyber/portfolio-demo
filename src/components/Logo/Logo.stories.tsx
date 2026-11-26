import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  decorators: [
    // Шапка сайту світла: показуємо логотип на фоні accent.
    (Story) => (
      <div className="bg-accent p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Логотип у шапці сайту: знак VM, а поруч ім'я й роль. Це посилання на початок сторінки. Знак, ім'я й розмітка взяті зі старого сайту.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`showName\` | \`true\` (знак з іменем і роллю), \`false\` (лише знак) | \`true\` |
| \`name\` | ім'я | Victoria Mudrytska |
| \`role\` | роль під іменем | UX/UI Designer |
| \`href\` | куди веде логотип | \`/\` (початок сторінки) |
| \`label\` | доступна назва, коли показано лише знак | ім'я |

Решта атрибутів посилання передаються далі.

### Варіанти і стани

- Логотип призначений для світлої шапки (фон \`accent\`), як на старому сайті, тому показаний у Storybook на \`accent\`. Текст \`canvas\`.
- **Знак з іменем** (\`showName\`): знак VM, поруч ім'я шрифтом \`font-serif\` жирним і роль під ним. Посилання отримує назву з видимого тексту.
- **Лише знак** (\`showName = false\`): тільки знак VM. Назву посилання дає \`aria-label\` (за замовчуванням ім'я).
- **Default**: знак повної видимості, ім'я без підкреслення.
- **Hover**: знак трохи світлішає, ім'я підкреслюється.
- **Focus** (клавіатура): контур \`canvas\` із відступом навколо всього логотипа.
- Знак має пропорцію \`aspect-logo\`. Саме зображення декоративне (порожній \`alt\`), бо поруч є назва.

### Токени

Кольори: \`canvas\`, \`accent\` (фон). Радіус: \`rounded-control\`. Пропорція: \`aspect-logo\`. Текст: \`text-lead\` (ім'я), \`text-caption\` (роль). Відступи: \`4\`; ширина знака дорівнює двом крокам відступу 8 (клас у \`Logo.css\`). Контраст: \`canvas\` на \`accent\` 14,37:1 (пара є в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens), контур фокусу \`canvas\` на \`accent\` теж 14,37:1.

### Коли використовувати

- Один логотип на сайт, на початку шапки, зліва.
- Повний варіант (з іменем) на широкому екрані, лише знак там, де мало місця.
- Став на світлий фон \`accent\`: на темному текст \`canvas\` не читається.
- Не використовуй як просте посилання в тексті: це тільки логотип сайту.

### Як взяти в код

\`\`\`tsx
import { Logo } from "@/components/Logo/Logo";

<Logo />            {/* знак з іменем і роллю */}
<Logo showName={false} />   {/* лише знак */}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    showName: { control: "boolean" },
    name: { control: "text" },
    role: { control: "text" },
    label: { control: "text" },
    href: { control: "text" },
  },
  args: {
    showName: true,
    name: "Victoria Mudrytska",
    role: "UX/UI Designer",
    href: "#top",
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
