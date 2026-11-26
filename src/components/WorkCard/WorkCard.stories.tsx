import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import cover from "@/assets/work-cover-example.png";
import { WorkCard } from "./WorkCard";

const meta = {
  title: "Components/WorkCard",
  component: WorkCard,
  tags: ["autodocs"],
  decorators: [
    // Картка задумана для фону canvas: показуємо її на ньому.
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
Картка роботи на головній сторінці: обкладинка, назва й короткий опис. Уся картка є посиланням на сторінку кейсу, тож її можна натиснути мишею й дійти до неї клавішею Tab.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`title\` | назва роботи (обов'язковий) | немає |
| \`description\` | короткий опис, після трьох рядків обрізається | немає |
| \`href\` | адреса сторінки кейсу | немає |
| \`image\` | обкладинка: картинка з теки \`assets\`, імпортована в код | немає |
| \`imageAlt\` | опис обкладинки для скрінрідера | порожньо (обкладинка декоративна) |

Решта атрибутів посилання (\`aria-label\`, \`onClick\`) передаються далі.

### Варіанти і стани

- **Default**: заливка \`surface\`, межа \`line\`, обкладинка пропорції \`aspect-cover\` на всю ширину, нижче назва \`ink\` і опис \`ink-muted\`.
- **Hover**: межа \`ink-muted\`, назва кольору \`accent\`, обкладинка плавно збільшується. При \`prefers-reduced-motion\` збільшення вимкнене.
- **Focus** (клавіатура): контур \`accent\` із відступом навколо всієї картки.
- Окремого вимкненого стану й стану помилки немає: картка завжди веде на кейс.

### Токени

Кольори: \`surface\`, \`line\`, \`ink\`, \`ink-muted\`, \`accent\`. Радіус: \`rounded-card\`. Пропорція: \`aspect-cover\`. Текст: \`text-lead\` (назва), \`text-body\` (опис). Відступи: \`2\`, \`6\`. Контраст усіх пар перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens: \`ink\` на \`surface\` 13,70:1, \`ink-muted\` на \`surface\` 7,63:1, \`accent\` на \`surface\` не нижче 4,5:1, контур фокусу \`accent\` на \`canvas\` 14,37:1.

### Коли використовувати

- Для переліку робіт на головній: три картки поруч, кожна веде на свій кейс.
- Обкладинку клади в теку \`assets\` і імпортуй у код, не бери з \`public\`: у Storybook файли з \`public\` не видно.
- Не вкладай у картку інші посилання чи кнопки: уся картка вже є посиланням.
- Назва й опис мають говорити самі за себе. \`imageAlt\` додавай, лише якщо обкладинка несе інформацію, якої немає в тексті.

### Як взяти в код

\`\`\`tsx
import cover from "@/assets/norda-cover.png";
import { WorkCard } from "@/components/WorkCard/WorkCard";

<WorkCard
  title="NORDA"
  description="Mobile app that plans a trip in one place."
  href="/norda"
  image={cover}
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    href: { control: "text" },
    imageAlt: { control: "text" },
    image: { control: false },
  },
  args: {
    title: "NORDA",
    description:
      "Mobile app that brings trip planning into one place: from choosing a destination to a day-by-day plan.",
    href: "#norda",
    image: cover,
    imageAlt: "",
  },
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
