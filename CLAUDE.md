@AGENTS.md

# Портфоліо: дизайн-система

## Проєкт і стек

Сайт-портфоліо (англійська основна мова, українська друга). Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Storybook 10.

- `src/app`: сторінки й розкладка (`page.tsx`, `HomeScreen.tsx`, `home.css`, `fonts.ts`, `globals.css`).
- `src/components/<Назва>/`: компоненти дизайн-системи.
- `src/content`: тексти (`home.ts`), вибір мови (`useLanguage.ts`, localStorage, ключ `lang`).
- `src/assets`: картинки й SVG.
- Команди: `npm run dev`, `npm run storybook` (порт 6006), `npm run lint`, `npm run build`.

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel публікує кожен пуш), тому перед пушем питай мене.

## Кольори

Єдине джерело: блок `@theme` у `src/app/globals.css`. Стандартна палітра Tailwind скинута (`--color-*: initial`), тому працюють лише ці вісім:

| Токен | Класи | Для чого |
| --- | --- | --- |
| `canvas` | `bg-canvas`, `text-canvas` | фон сторінки; текст на світлому (кнопка primary, шапка) |
| `surface` | `bg-surface` | піднята поверхня: поле форми, картка |
| `line` | `border-line` | тонкі розділювачі; межа вимкнених елементів |
| `accent` | `bg-accent`, `border-accent` | світла шапка, кнопка primary, контур фокусу |
| `glow` | `var(--color-glow)`, `*-glow` | світіння кнопок за курсором |
| `ink` | `text-ink` | основний текст |
| `ink-muted` | `text-ink-muted`, `border-ink-muted` | другорядний текст, плейсхолдер, межа поля й кнопки без заливки |
| `danger` | `text-danger`, `border-danger` | текст помилки й межа поля в стані помилки |

## Типографіка

- Шрифти (`src/app/fonts.ts`, з кирилицею): `font-sans` (Onest), `font-display` (Manrope 800), `font-serif` (Playfair Display, є курсив).
- Розміри (рівно сім), висота рядка, трекінг і жирність задані парами в `@theme`:
  - `text-caption` (13 px), `text-body` (17 px), `text-nav` (16 px), `text-small` (15 px);
  - плавні від ширини вікна: `text-lead` (17–22 px), `text-heading` (48–68 px), `text-display` (72–95 px, жирність 800).
- `text-nav`: пункти меню й мова в шапці на широкому екрані. `text-small`: текст кнопок і статус на широкому екрані (`md:text-small`, нижче `text-body`).
- Приклад: `font-display text-display`, `font-serif italic text-heading`, `text-lead text-ink-muted`.

## Відступи, радіуси й пропорції

- Відступи (числа в класах): `2`=8 px, `3`=12, `4`=16, `6`=24, `8`=32. Приклади: `p-4`, `gap-2`, `px-8 py-3`, `mt-6`.
- Токени розкладки сторінки: `section` (6rem, між секціями), `gutter` (бічне поле, 32–64 px, `px-gutter`), `header` (`h-header`, 88 px), `nav` (`gap-nav`), `stack` (`mt-stack`), `logo` (`w-logo`), `button-lg`, `button-lg-h`, `button-md`, `button-md-h`.
- Ширини: `max-w-content` (80rem), `w-ribbon` (48.9vw), `max-w-lead`.
- Радіуси: `rounded-control`, `rounded-card` (обидва 0, кути прямі).
- Пропорції картинок: `aspect-cover` (3/2), `aspect-portrait` (4/5), `aspect-ribbon` (728/465), `aspect-logo` (67/42).

## Компоненти

Кожен у своїй теці `src/components/<Назва>/` з історією `<Назва>.stories.tsx` (Controls, Docs). Storybook: розділ Components.

- **Button**: `variant` (`primary`, `secondary`), `size` (`md`, `lg`), `withArrow`, `disabled`, `disabledReason`. Стани: default, hover (світло за курсором, підйом), focus-visible, active, disabled. Ефекти в `Button.css`.
- **FormField**: `label`, `id`, `invalid`, `errorMessage`, `disabled`, `disabledReason`, решта атрибутів `input`. Стани: default, hover, focus, error (`aria-invalid`, `aria-describedby`), disabled.
- **Header**: `items`, `activeHref`, `actions`, `name`, `role`, `logoHref`. Фон `accent`, висота 88 px, Logo ліворуч, Navigation праворуч.
- **Logo**: `showName`, `name`, `role`, `href`, `label`. Знак з `src/assets/logo-vm.png`.
- **Navigation**: `items`, `activeHref` (`aria-current="page"`), `actions`, `openLabel`, `closeLabel`. На вузькому екрані бургер (`aria-expanded`, `aria-controls`), закривається Escape, кліком на пункт і повторним натиском на бургер.
- **LanguageSwitch**: `value` (`EN`, `UA`), `onChange`, `label`, `englishLabel`, `ukrainianLabel`. Керований, активна мова з `aria-current="true"`.
- **WorkCard**: `title`, `description`, `href`, `image`, `imageAlt`. Уся картка є посиланням, обкладинка `aspect-cover`, кути `rounded-card`.

## Правила

- Кольори, розміри тексту, радіуси й пропорції беруться тільки з токенів `@theme`. Hex, rgb, px і rem пишемо лише там.
- Класи, яких немає в `@theme` (`text-white`, `bg-black`, `bg-blue-600`, `text-sm`), не використовувати: невідомий клас мовчки не працює.
- Відступи в компонентах тільки з кроків 8, 12, 16, 24 і 32 px (числа 2, 3, 4, 6, 8 у класах). Токени розкладки (`gutter`, `section`, `header`, `stack` тощо) лише на сторінках.
- Довільні значення в квадратних дужках (`p-[13px]`, `h-[150px]`, `text-[#fff]`) заборонені.
- Нові кольори не додавати. Нові розміри тексту не додавати без потреби: кожен має використовуватись щонайменше двічі.
- Використовувати готові компоненти, а не вигадувати нові. Сторінка складається з Header, Logo, Navigation, LanguageSwitch, Button.
- Кожен інтерактивний елемент має стани default, hover, focus, disabled; поле форми ще й помилку.
- Вимкнена кнопка через `aria-disabled` з видимим поясненням (`disabledReason`), не через атрибут `disabled`.
- Картинки лежать у `src/assets` і імпортуються в код. Зовнішніх немає.
- Після змін у компонентах оновлювати його історію й документацію в Storybook; після змін токенів перевіряти сторінку Foundations/Tokens.

## Посилання

- План сайту: [plan.md](plan.md)
- Storybook: `npm run storybook`, http://localhost:6006 (Components, Foundations/Tokens)
- Storybook, публічна адреса: https://portfolio-demo-ten-indol.vercel.app/storybook/
