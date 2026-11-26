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
- Розміри тексту: `text-caption`, `text-body`, `text-lead`, `text-heading`, `text-display`. Висота рядка, трекінг і жирність задані парами в `@theme`.
- Шрифти: `font-sans` (Onest), `font-display` (Manrope 800), `font-serif` (Playfair Display). Підключені в `src/app/fonts.ts` з кирилицею.
- Відступи: тільки 8, 12, 16, 24, 32 px (числа 2, 3, 4, 6, 8 у класах), плюс `section` (відстань між великими секціями) і `max-w-content` (ширина контенту).
- Пропорції картинок: `aspect-cover`, `aspect-portrait`, `aspect-ribbon`, `aspect-logo`.
- Заборонено: hex і rgb у компонентах, стандартні класи Tailwind поза системою (`bg-blue-600`, `text-sm`, `text-white`), значення в квадратних дужках. Невідомий клас Tailwind мовчки не працює.
- Рішення щодо контрасту: ліній між пунктами мобільного меню немає, пункти розділяємо відступами з набору.

## Компоненти

Кожен компонент лежить у своїй теці `src/components/<Назва>/` разом з історією `<Назва>.stories.tsx` (одна історія, Controls, Docs). Докладний опис, параметри й приклад: Storybook, розділ Components.

- **Button** (`src/components/Button/Button.tsx`): кнопка. Параметри `variant` (`primary`, `secondary`), `size` (`md`, `lg`), `withArrow`, `disabled`, `disabledReason`. Ефекти (світло за курсором, підйом, натискання, стрілка) у `Button.css`. Вимкнена кнопка через `aria-disabled` з видимим поясненням.
- **Header** (`src/components/Header/Header.tsx`): світла шапка (`accent`) на всю ширину, висота 96 px (вертикальні відступи 16 px): Logo ліворуч, Navigation праворуч, вміст за `max-w-content`. Параметри `items`, `activeHref`, `actions`, `name`, `role`, `logoHref`. Шапка `relative`, щоб мобільне меню Navigation розкривалось на всю її ширину.
- **Logo** (`src/components/Logo/Logo.tsx`): логотип у світлій шапці, посилання на початок сторінки. Параметри `showName` (знак з іменем і роллю або лише знак), `name`, `role`, `href`, `label`. Знак VM з `src/assets/logo-vm.png`, пропорція `aspect-logo`, текст `canvas`.
- **Navigation** (`src/components/Navigation/Navigation.tsx`): меню сайту. Параметри `items` (`label`, `href`), `activeHref` (отримує `aria-current="page"`), `actions` (кнопка, перемикач мови), `openLabel`, `closeLabel`. На вузькому екрані бургер (`aria-expanded`, `aria-controls`) з меню поверх контенту, закривається Escape, кліком на пункт і повторним натиском на бургер (фокус повертається на бургер). Зверху вниз: пункти, перемикач мови, кнопка; пункти без ліній, лише відступи.
- **LanguageSwitch** (`src/components/LanguageSwitch/LanguageSwitch.tsx`): перемикач мови EN / UA. Параметри `value` (`EN`, `UA`, активна мова з `aria-current="true"`), `onChange`, `label`, `englishLabel`, `ukrainianLabel`. Кожна мова це кнопка з доступною назвою. Компонент керований.
- **WorkCard** (`src/components/WorkCard/WorkCard.tsx`): картка роботи, уся є посиланням. Параметри `title`, `description`, `href`, `image` (картинка з `src/assets`, імпортована в код), `imageAlt`. Обкладинка `aspect-cover`, кути `rounded-card`.
- **FormField** (`src/components/FormField/FormField.tsx`): текстове поле з підписом над ним. Параметри `label`, `id`, `invalid`, `errorMessage`, `disabled`, `disabledReason`, решта атрибутів `input`. Підпис зв'язаний через `htmlFor`/`id`, помилка через `aria-invalid` і `aria-describedby`, вимкнене поле через `aria-disabled` з видимим поясненням.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [plan.md](plan.md)
