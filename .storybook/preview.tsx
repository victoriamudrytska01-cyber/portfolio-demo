import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    // Змінні шрифтів у layout сайту стоять на <html>, а Storybook layout не бачить.
    (Story) => (
      <div className={`${fontVariables} font-sans`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
