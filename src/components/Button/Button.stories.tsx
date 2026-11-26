import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    // Кнопки задумані для фону canvas: показуємо їх на ньому.
    (Story) => (
      <div className="bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Кнопка для дій: перейти до робіт, написати мені, надіслати форму. Головна дія на екрані одна (\`primary\`), решта \`secondary\`.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`variant\` | \`primary\`, \`secondary\` | \`primary\` |
| \`size\` | \`md\`, \`lg\` | \`md\` |
| \`withArrow\` | \`true\`, \`false\` | \`false\` |
| \`disabled\` | \`true\`, \`false\` | \`false\` |
| \`disabledReason\` | текст для скрінрідера, чому кнопка вимкнена | англійською: недоступна дія |
| \`children\` | текст кнопки | немає |

Решта атрибутів \`button\` (\`onClick\`, \`type\`, \`aria-label\`) передаються далі. \`type\` за замовчуванням \`button\`.

### Варіанти і стани

- \`primary\`: заливка \`accent\`, текст \`canvas\`. Наведення: заливка \`ink\`.
- \`secondary\`: заливка \`canvas\`, текст \`ink\`, межа \`ink-muted\`. Наведення: заливка \`surface\`.
- \`md\`: відступи \`px-6 py-3\`, текст \`text-body\`. \`lg\`: відступи \`px-8 py-4\`, текст \`text-lead\`.
- \`withArrow\`: стрілка з'являється при наведенні й при фокусі з клавіатури. Місце під неї зарезервоване завжди, тож кнопка не стрибає.
- Фокус з клавіатури (Tab): контур \`accent\` із відступом.
- \`disabled\`: заливка \`canvas\`, текст \`ink-muted\`, межа \`line\`. Кнопка лишається у фокусі й озвучує причину через \`aria-describedby\`, але натискання не спрацьовує. Атрибут \`disabled\` не використовується, щоб кнопку було видно скрінрідеру.

### Токени

Кольори: \`accent\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`surface\`, \`line\`. Радіус: \`rounded-control\`. Текст: \`text-body\`, \`text-lead\`. Відступи: \`2\`, \`3\`, \`4\`, \`6\`, \`8\`. Контраст усіх пар текст/фон перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens.

### Коли використовувати

- \`primary\` для єдиної головної дії на екрані («View my work»).
- \`secondary\` для додаткової дії поруч («Get in touch»).
- \`withArrow\` для дій, що ведуть далі, на інший екран чи розділ.
- Не використовуйте кнопку як посилання на іншу сторінку без дії в самому інтерфейсі: для переходів потрібен окремий компонент посилання.
- Не став \`disabled\` без пояснення: заповни \`disabledReason\`.

### Як взяти в код

\`\`\`tsx
import { Button } from "@/components/Button/Button";

<Button variant="primary" size="md" withArrow onClick={openWork}>
  View my work
</Button>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["md", "lg"] },
    withArrow: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "View my work",
    variant: "primary",
    size: "md",
    withArrow: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
