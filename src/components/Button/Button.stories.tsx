import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs, useEffect } from "storybook/preview-api";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    // primary стоїть на фоні canvas, secondary ("Get in touch") на світлому фоні paper, як на сайті.
    (Story, context) => (
      <div className={context.args.variant === "secondary" ? "bg-paper p-8" : "bg-canvas p-8"}>
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
| \`size\` | \`md\`, \`lg\` | \`md\` (в історії Storybook за замовчуванням \`lg\`) |
| \`withArrow\` | \`true\`, \`false\` | \`false\` (в історії Storybook вибір \`primary\` вмикає стрілку, а \`secondary\` вимикає) |
| \`disabled\` | \`true\`, \`false\` | \`false\` |
| \`disabledReason\` | видимий текст під вимкненою кнопкою: чому вона вимкнена | англійською: недоступна дія |
| \`children\` | текст кнопки | немає |

Решта атрибутів \`button\` (\`onClick\`, \`type\`, \`aria-label\`) передаються далі. \`type\` за замовчуванням \`button\`.

### Варіанти і стани

- \`primary\`: заливка \`accent\`, текст \`canvas\`. Насичене персикове світло за курсором.
- \`secondary\` (кнопка «Get in touch» зі старого сайту): темна заливка \`canvas\`, текст \`ink\`, помітної рамки немає (межа кольору заливки). Призначена для світлого фону, у Storybook показана на \`accent\`. Тепле персикове світло за курсором із токена \`glow\`: коло вдвічі менше, ніж у \`primary\`, м'яке, без білого центру (центр 55%). При наведенні під кнопкою м'яка тінь з \`canvas\`. Стрілки за замовчуванням немає, текст по центру. Поведінка така сама, як у \`primary\`: світло йде за мишею, підйом, натискання, \`prefers-reduced-motion\`.
- Ефекти (стили в \`Button.css\`, усі кольори зі змінних токенів):
  - **Світло за курсором**: радіальний градієнт іде за мишкою (змінні \`--mx\` і \`--my\`, їх виставляє \`onMouseMove\`) і плавно з'являється при наведенні. У \`primary\`: центр \`ink\`, через суміш \`ink\` і \`glow\` до краю \`glow\`, радіус близько 120 px з токенів відступів; текст \`canvas\` на центрі 15,28:1, на середині 11,41:1, на краї \`glow\` 8,25:1. У \`secondary\`: світло з \`glow\`, радіус вдвічі менший (близько 60 px), центр 55% непрозорості, до середини 12%, далі зникає; текст \`ink\` на центрі 4,60:1, на середині не нижче 10:1. Усюди не нижче 4,5:1.
  - **Наведення**: кнопка піднімається на 2 px, з'являється м'яка тінь: у \`secondary\` темна, з \`canvas\` (на світлому фоні вона видна), у \`primary\` світлий ореол з \`ink-muted\` (на темному фоні темна тінь була б невидимою). Стрілка (якщо є) проявляється плавно.
  - **Натискання**: легке стиснення (\`scale\` 0,96) і внутрішня тінь.
  - **Дотикові екрани**: наведення не залипає (ефекти лише там, де є справжній вказівник), натискання працює.
  - **Зменшений рух** (\`prefers-reduced-motion\`): без підйому, стиснення й тіней, світло нерухоме в центрі, лишається лише зміна кольору.
- \`md\`: відступи \`px-8 py-3\`, текст \`text-body\` (у \`secondary\` звичайної жирності, у \`primary\` середньої). Розмір \`md\` збігається зі старою кнопкою «Get in touch» (на широкому вікні близько 161 на 51 px). \`lg\`: відступи \`px-8 py-3\`, текст \`text-body\`, мінімальна ширина й висота з токенів \`button-lg\` і \`button-lg-h\` (плавні: на вікні 1710 px це 249 на 52 px, на 1920 px 279 на 59 px). Розмір \`lg\` збігається зі старою кнопкою «View my work»; \`md\` менший.
- \`withArrow\`: поведінка як на старому сайті. У спокої текст стоїть точно по центру, справа порожнього місця немає. При наведенні й фокусі з клавіатури текст плавно зсувається вліво на половину (стрілка плюс відступ), а стрілка (пропорції 22 до 12, відступ від тексту крок 2) плавно з'являється справа. Текст і стрілка разом лишаються по центру, відступи до країв кнопки зліва й справа однакові. Стрілка позиціонується всередині кнопки й не займає місця, тож ширина кнопки не змінюється, сусідні елементи не рухаються. У вимкненій кнопці стрілки немає. При \`prefers-reduced-motion\` текст не зсувається, стрілка з'являється на місці без руху.
- Фокус з клавіатури (Tab): контур із відступом кольору фону, на якому стоїть кнопка: \`accent\` у \`primary\` (на \`canvas\`), \`canvas\` у \`secondary\` (на світлому фоні).
- \`disabled\`: заливка \`canvas\`, текст \`ink-muted\`, межа \`line\`. Під кнопкою з'являється видимий текст-пояснення (\`text-caption\`, \`ink-muted\`), зв'язаний з нею через \`aria-describedby\`. Кнопка лишається у фокусі, але натискання не спрацьовує. Атрибут \`disabled\` не використовується, щоб кнопку знаходила клавіатура й скрінрідер. Пояснення читається на фоні \`canvas\`: на іншому фоні перевір контраст пари \`ink-muted\`.

### Токени

Кольори: \`accent\`, \`glow\`, \`canvas\`, \`ink\`, \`ink-muted\`, \`surface\`, \`line\`. Радіус: \`rounded-control\`. Текст: \`text-body\`, \`text-caption\` (пояснення під вимкненою кнопкою). Відступи: \`2\`, \`3\`, \`4\`, \`6\`, \`8\`. Контраст усіх пар текст/фон перевіряється в таблиці «Пари кольорів і контраст» на сторінці Foundations/Tokens.

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
    size: "lg",
    withArrow: true,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Як на сайті: у primary стрілка є, у secondary ("Get in touch") її немає.
// Вибір варіанта в Controls виставляє withArrow за замовчуванням, перемикач лишається вільним.
// Хуки Storybook (useArgs, useEffect) викликаються прямо в render історії.
export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    useEffect(() => {
      updateArgs({ withArrow: args.variant !== "secondary" });
    }, [args.variant, updateArgs]);
    return <Button {...args} />;
  },
};
