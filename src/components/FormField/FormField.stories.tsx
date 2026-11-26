import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  decorators: [
    // Поле задумане для фону canvas: показуємо його на ньому.
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
Текстове поле з підписом: ім'я, пошта, повідомлення у формі контактів. Підпис завжди над полем і зв'язаний з ним, тож скрінрідер і клік по підпису працюють.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`label\` | підпис над полем (обов'язковий) | немає |
| \`id\` | \`id\` поля, зв'язує підпис і поле | створюється автоматично |
| \`defaultValue\` | початкове значення, стан «заповнене» | порожньо |
| \`placeholder\` | підказка в порожньому полі | немає |
| \`invalid\` | стан помилки | \`false\` |
| \`errorMessage\` | текст помилки під полем | немає |
| \`disabled\` | вимкнене поле | \`false\` |
| \`disabledReason\` | видимий текст під вимкненим полем | англійською: поле недоступне |
| \`type\` | тип поля | \`text\` |

Решта атрибутів \`input\` (\`name\`, \`required\`, \`autoComplete\`, \`onChange\`) передаються далі.

### Варіанти і стани

- **Default**: заливка \`surface\`, межа \`ink-muted\`, текст \`ink\`, підказка \`ink-muted\`.
- **Hover**: межа \`ink\`.
- **Focus** (клавіатура й клік): контур \`accent\` із відступом.
- **Заповнене**: введене значення кольору \`ink\` замість підказки \`ink-muted\`. У Storybook перемикається полем \`defaultValue\` в Controls.
- **Помилка** (\`invalid\`): межа \`danger\`, під полем іконка помилки ліворуч від тексту й текст \`danger\`. Поле має \`aria-invalid\`, а \`aria-describedby\` вказує на текст помилки. Наведення межу не змінює.
- **Disabled**: заливка \`canvas\`, текст \`ink-muted\`, межа \`line\`. Поле лишається у фокусі (\`aria-disabled\`, а не атрибут \`disabled\`), значення змінити не можна. Під полем видиме пояснення, зв'язане через \`aria-describedby\`.

### Токени

Кольори: \`surface\`, \`ink\`, \`ink-muted\`, \`accent\`, \`danger\`, \`canvas\`, \`line\`. Радіус: \`rounded-control\`. Текст: \`text-body\` (поле), \`text-caption\` (підпис, помилка, пояснення). Відступи: \`2\`, \`3\`, \`4\`. Контраст усіх пар перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens: \`ink\` на \`surface\` 13,70:1, межа \`ink-muted\` на \`surface\` не нижче 3:1, \`danger\` на \`canvas\` 5,31:1, \`danger\` на \`surface\` 4,77:1.

### Коли використовувати

- Для короткого тексту в формі: ім'я, пошта, тема.
- Помилку показуй тільки з текстом: \`invalid\` без \`errorMessage\` лишає лише межу, а колір сам по собі не пояснює, що не так.
- \`disabled\` ставь із поясненням у \`disabledReason\`.
- Не використовуй для довгого тексту (потрібне багаторядкове поле) і для вибору зі списку.

### Як взяти в код

\`\`\`tsx
import { FormField } from "@/components/FormField/FormField";

<FormField
  label="Email"
  name="email"
  type="email"
  placeholder="name@example.com"
  invalid={hasError}
  errorMessage="Enter a valid email address."
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    invalid: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    disabledReason: { control: "text" },
  },
  args: {
    label: "Email",
    placeholder: "name@example.com",
    defaultValue: "",
    invalid: false,
    errorMessage: "Enter a valid email address.",
    disabled: false,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// key заставляє поле перемальовуватись, коли в Controls змінюють defaultValue.
export const Playground: Story = {
  render: (args) => <FormField key={String(args.defaultValue)} {...args} />,
};
