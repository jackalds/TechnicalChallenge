📘 Tabs Component — Design System Challenge

This repository contains my implementation of a reusable, accessible Tabs component developed as part of a front-end take-home test. The goal of this project is to demonstrate clean React architecture, component reusability, TypeScript typing, and adherence to modern accessibility and styling standards within a Design System context.

🧩 Key Features

- Fully accessible and keyboard-navigable Tabs.
- Supports multiple design variants based on provided Figma specifications.
- Extensible API for adding customizable Badges to individual Tabs.
- Variant support for multiple Badge styles.
- Implemented using React + TypeScript with raw HTML/CSS (no CSS frameworks).
- Optional integration with Storybook for interactive component documentation.

🛠 Tech Stack

- React (Hooks-based)
- TypeScript for static typing and improved developer experience.
- CSS / CSS-in-JS / SASS (written from scratch).
- Storybook (optional) for visual demonstration.

🎯 Objectives

- Build a consistent, maintainable, and strongly typed component for a scalable design system.
- Follow accessibility and front-end development best practices.
- Exhibit clean code structure, reusability, and an intuitive API design.

💡 This project is part of a technical evaluation and is not intended for production or broader development use.

This is the base repository for the home test. The repository is created with `vite` and is empty, but contains some packages already installed, in particular:

- `react`
- `storybook`
- `vitest`

## Install and run

```bash
# Install dependencies
# This project use `pnpm` as package manager, but you can use also `npm` or `yarn`.
pnpm install

# And run the project
pnpm dev

# Optional: Run Storybook
pnpm storybook
```

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).
