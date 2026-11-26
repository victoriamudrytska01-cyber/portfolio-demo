import { Manrope, Onest, Playfair_Display } from "next/font/google";

// Кирилиця потрібна, бо сайт має українську версію. next/font вимагає, щоб subsets були записані прямо в виклику.
export const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["800"],
  display: "swap",
});

export const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Класи зі змінними шрифтів: на <html> у layout і в декораторі Storybook. */
export const fontVariables = `${onest.variable} ${manrope.variable} ${playfair.variable}`;
