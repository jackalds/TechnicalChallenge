import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    pseudoStates: {
      selector: "button[role='tab'], button",
      prefix: "pseudo-states--",
      attributes: ["disabled"],
    },
  },
};

export default preview;
