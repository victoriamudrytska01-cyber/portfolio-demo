@AGENTS.md

# Портфоліо: правила проєкту

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel публікує кожен пуш), тому перед пушем питай мене.

## Токени

Єдине джерело значень: блок `@theme` у `src/app/globals.css`. Hex, px і rem пишемо тільки там. Перегляд: Storybook, сторінка Foundations/Tokens (`npm run storybook`).

- Кольори (вісім): `canvas`, `surface`, `line`, `accent`, `glow`, `ink`, `ink-muted`, `danger`. `glow` це колір світіння кнопок (світло за курсором), у компонентах тільки як `var(--color-glow)` або клас `*-glow`. Межа поля форми й кнопки без заливки: `ink-muted`, не `line`.
- `danger`: вінний, бордовіший відтінок для тексту помилки й межі поля в стані помилки. Контраст: на `canvas` 5,3:1, на `surface` 4,8:1 (текст потребує 4,5:1, межа 3:1), тож підходить для обох.
- Радіуси: `rounded-control`, `rounded-card` (обидва 0, кути прямі).
- Розміри тексту (рівно сім): `text-caption`, `text-body`, `text-lead`, `text-heading`, `text-display`, `text-nav`, `text-small`. `text-lead` (17–22 px), `text-heading` (48–68 px) і `text-display` (72–95 px) плавні, від ширини вікна; на телефоні вони мають мінімум. Висота рядка, трекінг і жирність задані парами в `@theme`.
- Шрифти: `font-sans` (Onest), `font-display` (Manrope 800), `font-serif` (Playfair Display). Підключені в `src/app/fonts.ts` з кирилицею.
- Відступи: тільки 8, 12, 16, 24, 32 px (числа 2, 3, 4, 6, 8 у класах), плюс `section` (відстань між великими секціями), `max-w-content` (ширина контенту) і `gutter` (бічне поле сторінки, класи `px-gutter`, `w-gutter`: `clamp(2rem, 4.4vw, 4rem)`, тобто від 32 до 64 px, значення `--pad-x` старого сайту; ним починаються шапка й заголовок першого екрана).
- Розкладкові токени першого екрана й шапки (плавні, значення старого сайту; класи через префікси `h-`, `gap-`, `mt-`, `w-`, `max-w-`):
  - `header`: висота шапки на широкому екрані, `6rem` (96 px на екрані будь-якої висоти);
  - `nav`: проміжок між пунктами меню, мовою й кнопкою в шапці, `clamp(1.75rem, 3.02vw, 3.5rem)` (56 px на екрані завширшки 1920 px, 28–56 px);
  - `stack`: вертикальні проміжки першого екрана між підзаголовком, кнопкою й статусом, `clamp(1.5rem, 3vw, 4.5rem)` (24–72 px);
  - `logo`: ширина знака VM на широкому екрані, `3.75rem` (60 px);
  - `button-lg` і `button-lg-h`: мінімальна ширина й висота кнопки lg, `clamp(13.1875rem, 15.6vw, 20rem)` і `clamp(2.9375rem, 3.06vw, 5rem)` (на екрані 1920 px завширшки це 300 на 59 px); `button-md` і `button-md-h`: те саме для кнопки md, `clamp(8rem, 9.32vw, 12rem)` і `clamp(2.5rem, 3.02vw, 4rem)` (179 на 58 px);
  - `ribbon` (`w-ribbon`): ширина стрічки VM, `48.9vw`; `lead` (`max-w-lead`): найбільша ширина підзаголовка, `clamp(17.5rem, 27.6vw, 33rem)`.
- `text-nav` (16 px): пункти меню й перемикач мови в шапці на широкому екрані (Navigation, LanguageSwitch). `text-small` (15 px): текст кнопок і статус на першому екрані на широкому екрані (Button md і lg, статус). Більше додаткових розмірів не додаємо без потреби: ліміт дев'ять, кожен додатковий має використовуватись щонайменше двічі. На телефоні заголовок бере зменшені `text-display` і `text-heading` (див. `home.css`).
- Пропорції картинок: `aspect-cover`, `aspect-portrait`, `aspect-ribbon`, `aspect-logo`.
- Заборонено: hex і rgb у компонентах, стандартні класи Tailwind поза системою (`bg-blue-600`, `text-sm`, `text-white`), значення в квадратних дужках. Невідомий клас Tailwind мовчки не працює.
- Рішення щодо контрасту: ліній між пунктами мобільного меню немає, пункти розділяємо відступами з набору.

## Компоненти

Кожен компонент лежить у своїй теці `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx` (одна історія, Controls, Docs). Докладний опис, параметри й приклад: Storybook, розділ Components.

- **Button** (`src/components/Button/Button.tsx`): кнопка. Параметри `variant` (`primary`, `secondary`), `size` (`md`, `lg`), `withArrow`, `disabled`, `disabledReason`. Ефекти (світло за курсором, підйом, натискання, стрілка) у `Button.css`. Вимкнена кнопка через `aria-disabled` з видимим поясненням.
- **Header** (`src/components/Header/Header.tsx`): світла шапка (`accent`) на всю ширину, висота 96 px (вертикальні відступи 16 px): Logo ліворуч, Navigation праворуч, бічні поля `px-gutter`. Параметри `items`, `activeHref`, `actions`, `name`, `role`, `logoHref`. Шапка `relative`, щоб мобільне меню Navigation розкривалось на всю її ширину.
- **Logo** (`src/components/Logo/Logo.tsx`): логотип у світлій шапці, посилання на початок сторінки. Параметри `showName` (знак з іменем і роллю або лише знак), `name`, `role`, `href`, `label`. Знак VM з `src/assets/logo-vm.png`, пропорція `aspect-logo`, текст `canvas`.
- **Navigation** (`src/components/Navigation/Navigation.tsx`): меню сайту. Параметри `items` (`label`, `href`), `activeHref` (отримує `aria-current="page"`), `actions` (кнопка, перемикач мови), `openLabel`, `closeLabel`. На вузькому екрані бургер (`aria-expanded`, `aria-controls`) з меню поверх контенту, закривається Escape, кліком на пункт і повторним натиском на бургер (фокус повертається на бургер). Як на мобільній версії старого сайту: бургер з косими рисками / хрестик, пункти курсивом із засічками без ліній, нижче ряд (кнопка ліворуч, мова праворуч, активна підкреслена), нижній правий кут меню зрізаний.
- **LanguageSwitch** (`src/components/LanguageSwitch/LanguageSwitch.tsx`): перемикач мови EN / UA. Параметри `value` (`EN`, `UA`, активна мова з `aria-current="true"`), `onChange`, `label`, `englishLabel`, `ukrainianLabel`. Кожна мова це кнопка з доступною назвою. Компонент керований.
- **WorkCard** (`src/components/WorkCard/WorkCard.tsx`): картка роботи, уся є посиланням. Параметри `title`, `description`, `href`, `image` (картинка з `src/assets`, імпортована в код), `imageAlt`. Обкладинка `aspect-cover`, кути `rounded-card`.
- **FormField** (`src/components/FormField/FormField.tsx`): текстове поле з підписом над ним. Параметри `label`, `id`, `invalid`, `errorMessage`, `disabled`, `disabledReason`, решта атрибутів `input`. Підпис зв'язаний через `htmlFor`/`id`, помилка через `aria-invalid` і `aria-describedby`, вимкнене поле через `aria-disabled` з видимим поясненням.

## Структура перших екранів

Головний екран зібраний зі старого сайту (папка `portfolio`, лише читання) з компонентів дизайн-системи, лише з токенів. Нових компонентів для сторінок не вигадуємо: сторінка складається з Header, Logo, Navigation, LanguageSwitch, Button.

- `src/app/page.tsx`: сторінка, лише рендерить `HomeScreen`.
- `src/app/HomeScreen.tsx` (клієнтський): шапка (`Header` з `Logo`, `Navigation`, `LanguageSwitch` і `Button secondary` «Get in touch») та перший екран (`main.hero`): заголовок «I design» (`text-display`, `font-display`) із курсивом (`text-heading`, `font-serif italic`), підзаголовок (`text-lead`, на телефоні `text-body`, `ink-muted`), `Button primary` «View my work» зі стрілкою, статус із крапкою (`text-caption`), стрічка VM (`aspect-ribbon`).
- `src/app/home.css`: розкладка першого екрана (висота під шапкою, розміри заголовка на телефоні як 13/18 і 2/3 токенів, обрізка й плавання стрічки). Усі розміри через `var(--spacing-*)` і `var(--text-*)`.
- `src/content/home.ts`: тексти англійською (основна) і українською зі старого сайту. `src/content/useLanguage.ts`: вибір мови (localStorage, ключ `lang`), `html lang` оновлюється в `HomeScreen`.
- `src/assets/`: `ribbon-vm.png` (стрічка), `status-dot.svg` (крапка статусу), `logo-vm.png` (знак у Logo). Картинки імпортуються в код, зовнішніх немає.
- Розкладка: бічне поле `px-gutter`, відстань між текстом і стрічкою `gap-section` (від `xl`). До `lg` колонка зі стрічкою зверху, від `lg` текст ліворуч і стрічка праворуч, усе по центру по вертикалі. Заголовок починається з того самого поля, що й логотип.
- Фон сторінки `canvas`, шапка `accent`. Розділи «роботи», «про мене», «контакти» ще не зроблені: кнопки й пункти меню ведуть до якорів `#work`, `#about`, `#contacts`.
- Нові екрани й розділи додаємо за цією схемою: сторінка в `src/app`, тексти в `src/content`, картинки в `src/assets`, розкладка з токенів.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [plan.md](plan.md)
