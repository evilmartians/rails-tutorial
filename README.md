# TutorialKit.rb Starter

This README includes everything you need to start writing your in-browser Ruby tutorials content.

Based on [TutorialKit](https://tutorialkit.dev).

## Project Structure

```bash
.
├── astro.config.mjs    # TutorialKit uses Astro 🚀 (https://astro.build)
├── src
│   ├── ...
│   ├── content
│   │   └── tutorial    # Your tutorial content lives here
│   └── templates       # Your templates (see below for more information)
├── public
│   ├── favicon.svg
│   └── logo.svg        # Default logo used in top left for your tutorial
├── ...
├── theme.ts            # Customize the theme of the tutorial
└── uno.config.ts       # UnoCSS config (https://unocss.dev/)
```

## Getting Started

Make sure you have all dependencies installed and started the dev server:

```bash
pnpm install
pnpm start
```

## UI Structure

```markdown
┌─────────────────────────────────────────────────────┐
│ ● ● ●                                               │
├───────────────────────────┬─────────────────────────┤
│                           │                         │
│                           │                         │
│                           │                         │
│                           │                         │
│                           │       Code Editor       │
│                           │                         │
│                           │                         │
│                           │                         │
│                           │                         │
│          Content          ├─────────────────────────┤
│                           │                         │
│                           │                         │
│                           │  Preview & Boot Screen  │
│                           │                         │
│                           │                         │
│                           ├─────────────────────────┤
│                           │                         │
│                           │        Terminal         │
│                           │                         │
└───────────────────────────┴─────────────────────────┘
```

## Authoring Content

A tutorial consists of parts, chapters, and lessons. For example:

- Part 1: Basics of Vite
  - Chapter 1: Introduction
    - Lesson 1: Welcome!
    - Lesson 2: Why Ruby?
    - …
  - Chapter 2: Your first Vite project
- Part 2: CLI
  - …

Your content is organized into lessons, with chapters and parts providing a structure and defining common metadata for these lessons.

Here’s an example of how it would look like in `src/content/tutorial`:

```bash
tutorial
├── 1-basics-of-ruby
│   ├── 1-introduction
│   │   ├── 1-welcome
│   │   │   ├── content.md    # The content of your lesson
│   │   │   ├── _files        # Initial set of files
│   │   │   │   └── ...
│   │   │   └── _solution     # Solution of the lesson
│   │   │       └── ...
│   │   ├── 2-why-ruby
│   │   │   ├── content.md
│   │   │   └── _files
│   │   │       └── ...
│   │   └── meta.md           # Metadata for the chapter
│   └── meta.md               # Metadata for the part
├── 2-advanced
│   ├── ...
│   └── meta.md
└── meta.md                   # Metadata for the tutorial
```
