import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import { LanguageSwitch } from "./LanguageSwitch";

const meta = {
  title: "Components/LanguageSwitch",
  component: LanguageSwitch,
  tags: ["autodocs"],
  decorators: [
    // Шапка сайту світла: показуємо перемикач на фоні accent.
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

- Перемикач призначений для світлої шапки (фон \`accent\`), як на старому сайті, тому показаний у Storybook на \`accent\`.
- **Активна мова** (\`aria-current="true"\`): на широкому екрані жирний текст \`canvas\`. На вузькому екрані (до \`md\`, у мобільному меню) активна мова не жирна, а підкреслена, як у мобільному меню старого сайту. У Storybook перемикається в Controls і кліком.
- **Неактивна мова, default**: приглушений текст, суміш \`canvas\` і \`accent\` (70% \`canvas\`) через \`color-mix\`.
- **Hover**: неактивна мова стає \`canvas\` і підкреслюється, активна підкреслюється.
- **Focus** (клавіатура): контур \`canvas\` із відступом.
- Роздільник «/» декоративний (\`aria-hidden\`), того самого приглушеного кольору.
- Кожна кнопка має доступну назву («English», «Українська») і атрибут \`lang\`, тож скрінрідер читає назви правильною мовою.

### Токени

Кольори: \`canvas\`, \`accent\`. Приглушений колір: \`color-mix\` з \`canvas\` і \`accent\` у \`LanguageSwitch.css\`. Радіус: \`rounded-control\`. Текст: \`text-body\`, активна мова \`font-semibold\`. Відступи: \`2\`, \`3\`. Контраст на \`accent\`: активна мова \`canvas\` 14,37:1 (пара є в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens), приглушена мова 6,07:1, контур фокусу \`canvas\` на \`accent\` 14,37:1.

### Коли використовувати

- Один перемикач мови на сайт, зазвичай у світлій шапці поруч з навігацією (у \`actions\` компонента Navigation).
- Став на світлий фон \`accent\`: на темному текст \`canvas\` не читається.
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
