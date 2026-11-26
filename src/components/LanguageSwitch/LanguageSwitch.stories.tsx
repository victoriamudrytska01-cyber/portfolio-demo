import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { LanguageSwitch } from "./LanguageSwitch";

const meta = {
  title: "Components/LanguageSwitch",
  component: LanguageSwitch,
  tags: ["autodocs"],
  decorators: [
    // Перемикач задуманий для фону canvas: показуємо його на ньому.
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
Перемикач мови сайту: англійська (основна) і українська. Дві мови поруч, розділені «/». Активна мова жирна, неактивна приглушена, обидві читаються. Кожна мова є кнопкою з доступною назвою.

### Параметри

| Параметр | Значення | За замовчуванням |
| --- | --- | --- |
| \`value\` | активна мова: \`EN\` або \`UA\` (обов'язковий) | немає |
| \`onChange\` | викликається з обраною мовою | немає |
| \`label\` | доступна назва групи | англійською: мова |
| \`englishLabel\` | доступна назва кнопки EN | English |
| \`ukrainianLabel\` | доступна назва кнопки UA | Українська |

Решта атрибутів \`div\` передаються далі. Компонент керований: активну мову тримає той, хто його використовує, а \`onChange\` повідомляє про вибір.

### Варіанти і стани

- **Активна мова** (\`aria-current="true"\`): жирний текст \`ink\`. У Storybook перемикається в Controls і кліком.
- **Неактивна мова, default**: текст \`ink-muted\`.
- **Hover**: неактивна мова стає \`ink\` і підкреслюється, активна підкреслюється.
- **Focus** (клавіатура): контур \`accent\` із відступом.
- Роздільник «/» декоративний (\`aria-hidden\`), кольору \`ink-muted\`.
- Кожна кнопка має доступну назву («English», «Українська») і атрибут \`lang\`, тож скрінрідер читає назви правильною мовою.

### Токени

Кольори: \`ink\`, \`ink-muted\`, \`accent\`. Радіус: \`rounded-control\`. Текст: \`text-body\`, активна мова \`font-semibold\`. Відступи: \`2\`, \`3\`. Контраст пар перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens: \`ink\` на \`canvas\` 15,28:1, \`ink-muted\` на \`canvas\` 8,51:1, контур фокусу \`accent\` на \`canvas\` 14,37:1.

### Коли використовувати

- Один перемикач мови на сайт, зазвичай у шапці поруч з навігацією (у \`actions\` компонента Navigation).
- Для двох мов. Для трьох і більше потрібен інший компонент, наприклад меню.
- Не змінюй текст кнопок на довгі назви: вони мають лишатися короткими кодами.

### Як взяти в код

\`\`\`tsx
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";

const [language, setLanguage] = useState<"EN" | "UA">("EN");

<LanguageSwitch value={language} onChange={setLanguage} />
\`\`\`
`,
      },
    },
  },
  argTypes: {
    value: { control: "select", options: ["EN", "UA"] },
    onChange: { control: false },
    label: { control: "text" },
    englishLabel: { control: "text" },
    ukrainianLabel: { control: "text" },
  },
  args: {
    value: "EN",
  },
} satisfies Meta<typeof LanguageSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Клік по мові оновлює значення в Controls, тож перемикач працює й мишею.
export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <LanguageSwitch {...args} onChange={(value) => updateArgs({ value })} />;
  },
};
