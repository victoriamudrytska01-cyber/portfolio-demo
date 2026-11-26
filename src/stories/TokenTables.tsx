import { useState } from "react";
import { fontVariables } from "../app/fonts";

/*
 * Таблиці для сторінки Foundations/Tokens. Жодного значення тут не записано:
 * розміри, висоту рядка, трекінг, жирність і кольори читаємо з браузера,
 * де їх уже обчислив @theme, а контраст рахуємо за формулою WCAG.
 */

const wrapper = `${fontVariables} sb-unstyled bg-canvas text-ink p-8 overflow-x-auto`;
const th = "text-caption text-ink-muted font-sans text-left p-3 border-b border-line";
const td = "p-3 border-b border-line align-middle font-sans text-body";

/* ---------- Розміри тексту ---------- */

const steps = [
  { token: "text-caption", sample: "text-caption font-sans" },
  { token: "text-body", sample: "text-body font-sans" },
  { token: "text-lead", sample: "text-lead font-sans" },
  { token: "text-heading", sample: "text-heading font-serif italic" },
  { token: "text-display", sample: "text-display font-display" },
  // Розміри першого екрана й шапки на широкому екрані: плавні, значення залежать від ширини вікна.
  { token: "text-nav", sample: "text-nav font-sans" },
  { token: "text-hero-lead", sample: "text-hero-lead font-sans" },
  { token: "text-hero-italic", sample: "text-hero-italic font-serif italic" },
  { token: "text-hero-display", sample: "text-hero-display font-display" },
];

type Metrics = { size: string; lineHeight: string; tracking: string; weight: string };

function readMetrics(sampleClass: string): Metrics {
  const probe = document.createElement("span");
  probe.className = `${fontVariables} ${sampleClass}`;
  document.body.append(probe);
  const s = getComputedStyle(probe);
  const size = parseFloat(s.fontSize);
  const lh = parseFloat(s.lineHeight);
  const ls = s.letterSpacing === "normal" ? 0 : parseFloat(s.letterSpacing);
  const weight = s.fontWeight;
  probe.remove();
  const num = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
  return {
    size: `${num(size)} px`,
    lineHeight: num(lh / size),
    tracking: ls === 0 ? "0" : `${num(ls / size)} em`,
    weight,
  };
}

export function TypeScaleTable() {
  // Storybook рендерить тільки в браузері, тож DOM доступний уже при першому рендері.
  const [rows] = useState<Metrics[]>(() => steps.map((step) => readMetrics(step.sample)));

  return (
    <div className={wrapper}>
      <table className="w-full">
        <thead>
          <tr>
            <th className={th}>Токен</th>
            <th className={th}>Розмір</th>
            <th className={th}>Висота рядка</th>
            <th className={th}>Трекінг</th>
            <th className={th}>Жирність</th>
            <th className={th}>Зразок</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, i) => (
            <tr key={step.token}>
              <td className={td}>{step.token}</td>
              <td className={td}>{rows[i]?.size}</td>
              <td className={td}>{rows[i]?.lineHeight}</td>
              <td className={td}>{rows[i]?.tracking}</td>
              <td className={td}>{rows[i]?.weight}</td>
              <td className={td}>
                <span className={step.sample}>Створюю · I design</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Пари кольорів і контраст ---------- */

type Pair = { fg: string; bg: string; kind: "text" | "border" };

const pairs: Pair[] = [
  { fg: "ink", bg: "canvas", kind: "text" },
  { fg: "ink", bg: "surface", kind: "text" },
  { fg: "ink-muted", bg: "canvas", kind: "text" },
  { fg: "canvas", bg: "accent", kind: "text" },
  { fg: "accent", bg: "canvas", kind: "text" },
  { fg: "canvas", bg: "glow", kind: "text" },
  { fg: "canvas", bg: "paper", kind: "text" },
  { fg: "danger", bg: "canvas", kind: "text" },
  { fg: "danger", bg: "surface", kind: "text" },
  { fg: "ink-muted", bg: "surface", kind: "text" },
  { fg: "accent", bg: "surface", kind: "text" },
  { fg: "ink-muted", bg: "canvas", kind: "border" },
  { fg: "ink-muted", bg: "surface", kind: "border" },
];

function resolveColor(token: string): [number, number, number] {
  const probe = document.createElement("span");
  probe.style.color = `var(--color-${token})`;
  document.body.append(probe);
  const rgb = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
  probe.remove();
  return [rgb[0], rgb[1], rgb[2]];
}

function luminance([r, g, b]: [number, number, number]) {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(fg: string, bg: string) {
  const a = luminance(resolveColor(fg));
  const b = luminance(resolveColor(bg));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function ContrastTable() {
  const [ratios] = useState<number[]>(() => pairs.map((p) => contrast(p.fg, p.bg)));

  return (
    <div className={wrapper}>
      <table className="w-full">
        <thead>
          <tr>
            <th className={th}>Пара</th>
            <th className={th}>Зразок</th>
            <th className={th}>Контраст</th>
            <th className={th}>Результат</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p, i) => {
            const ratio = ratios[i];
            const need = p.kind === "text" ? 4.5 : 3;
            const label = p.kind === "text" ? "4,5:1" : "3:1";
            const ok = ratio !== undefined && ratio >= need;
            return (
              <tr key={`${p.fg}-${p.bg}-${p.kind}`}>
                <td className={td}>
                  {p.kind === "border" ? `межа поля ${p.fg} на ${p.bg}` : `${p.fg} на ${p.bg}`}
                </td>
                <td className={td}>
                  <div
                    className="p-3 inline-block"
                    style={{ backgroundColor: `var(--color-${p.bg})` }}
                  >
                    {p.kind === "border" ? (
                      <div
                        className="p-2 border"
                        style={{ borderColor: `var(--color-${p.fg})` }}
                      >
                        Поле
                      </div>
                    ) : (
                      <span style={{ color: `var(--color-${p.fg})` }}>Текст Aa</span>
                    )}
                  </div>
                </td>
                <td className={td}>
                  {ratio === undefined ? "" : `${ratio.toFixed(2).replace(".", ",")}:1`}
                </td>
                <td className={td}>
                  {ratio === undefined ? "" : ok ? `проходить ${label}` : `не проходить ${label}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
