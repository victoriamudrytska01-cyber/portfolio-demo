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
| \`disabledReason\` | видимий текст під вимкненою кнопкою: чому вона вимкнена | англійською: недоступна дія |
| \`children\` | текст кнопки | немає |

Решта атрибутів \`button\` (\`onClick\`, \`type\`, \`aria-label\`) передаються далі. \`type\` за замовчуванням \`button\`.

### Варіанти і стани

- \`primary\`: заливка \`accent\`, текст \`canvas\`. Світло за курсором з \`ink\`.
- \`secondary\`: заливка \`canvas\`, текст \`ink\`, межа \`ink-muted\`. М'яке світло за курсором з \`ink-muted\`.
- Ефекти (стили в \`Button.css\`, усі кольори зі змінних токенів):
  - **Світло за курсором**: радіальний градієнт іде за мишкою (змінні \`--mx\` і \`--my\`, їх виставляє \`onMouseMove\`) і плавно з'являється при наведенні. Контраст тексту не падає й у центрі світла: \`canvas\` на \`ink\` 15,28:1 у \`primary\`, \`ink\` на \`ink-muted\` з прозорістю 30% 8,21:1 у \`secondary\`.
  - **Наведення**: кнопка піднімається на 2 px, з'являється м'яка тінь-ореол з \`ink-muted\` (на темному фоні справжня чорна тінь була б невидимою), стрілка проявляється плавно.
  - **Натискання**: легке стиснення (\`scale\` 0,96) і внутрішня тінь.
  - **Дотикові екрани**: наведення не залипає (ефекти лише там, де є справжній вказівник), натискання працює.
  - **Зменшений рух** (\`prefers-reduced-motion\`): без підйому, стиснення й тіней, світло нерухоме в центрі, лишається лише зміна кольору.
- \`md\`: відступи \`px-6 py-3\`, текст \`text-body\`. \`lg\`: відступи \`px-8 py-4\`, текст \`text-lead\`.
- \`withArrow\`: стрілка з'являється при наведенні й при фокусі з клавіатури. Місце під неї зарезервоване завжди, тож кнопка не стрибає.
- Фокус з клавіатури (Tab): контур \`accent\` із відступом.
- \`disabled\`: заливка \`canvas\`, текст \`ink-muted\`, межа \`line\`. Під кнопкою з'являється видимий текст-пояснення (\`text-caption\`, \`ink-muted\`), зв'язаний з нею через \`aria-describedby\`. Кнопка лишається у фокусі, але натискання не спрацьовує. Атрибут \`disabled\` не використовується, щоб кнопку знаходила клавіатура й скрінрідер. Пояснення читається на фоні \`canvas\`: на іншому фоні перевір контраст пари \`ink-muted\`.

### Токени

Кольори: \`accent\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`surface\`, \`line\`. Радіус: \`rounded-control\`. Текст: \`text-body\`, \`text-lead\`. Відступи: \`2\`, \`3\`, \`4\`, \`6\`, \`8\`. Контраст усіх пар текст/фон перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens.

### Коли використовувати

- \`primary\` для єдиної головної дії на екрані («View my work»).
- \`secondary\` для додаткової дії поруч («Get in touch»).
- \`withArrow\` для дій, що ведуть далі, на інший екран чи розділ.
- Не використовуйте кнопку як посилання на іншу сторінку без дії в самому інтерфейсі: для переходів потрібен окремий компонент посилання.
- Не став \`disabled\` без пояснення: заповни \`disabledReason\`, воно видиме під кнопкою.

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
    disabledReason: { control: "text" },
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
