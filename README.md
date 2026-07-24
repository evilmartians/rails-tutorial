# Rails Tutorial in the Browser

> [!TIP]
> Check out this tutorial live at [rails-tutorial.evilmartians.io](https://rails-tutorial.evilmartians.io).

This is a source code of the in-browser Rails Tutorial built with [ruby.wasm][], [wasmify-rails][], [PGlite][] and [TutorialKit][].

The tutorial contents are based on the official [Getting Started with Rails](https://guides.rubyonrails.org/getting_started.html) guide.

<br/>

<img src="https://cdn.evilmartians.com/badges/logo-no-label.svg" alt="Evil Martians logo" width="22" height="16" /> This project is built by <b><a href="https://evilmartians.com/">Evil Martians</a></b>, an American design and engineering consultancy for <b>developer tools, AI, and cybersecurity startups</b>.

## Getting Started

Make sure you have all dependencies installed and started the dev server:

```bash
npm install
npm start
```

## Project Structure

```bash
.
├── astro.config.mjs    # TutorialKit uses Astro 🚀 (https://astro.build)
├── rails-wasm/         # Source code for the `rails.wasm` module and the `@rails-tutorial/wasm` NPM package
├── src
│   ├── ...
│   ├── content
│   │   └── tutorial   # Tutorial contents (.md + meta)
│   └── templates       # Project templates
├── ...
├── theme.ts            # Customize the theme of the tutorial
└── uno.config.ts       # UnoCSS config (https://unocss.dev/)
```

## Patches

Currently, we patch TutorialKit internals to fix some bugs and bring some improvements (like, Ruby syntax highlighting support). We use `npx patch-package` to generate patches and apply them on `npm install` (see the `patches/` directory).

## Templates

The default template (`src/templates/default`) contains the actual Node.js code to run a Rails application (`bin/rails`, `bin/rackup`, etc.) and configure PGLite databases.

Other templates contain the Rails app code. Templates support inheritance, so each Rails template only contains the new and changed files compared to the parent one (and the `rails-new` template is a starting point).

[ruby.wasm]: https://github.com/ruby/ruby.wasm
[wasmify-rails]: https://github.com/palkan/wasmify-rails
[PGlite]: https://pglite.dev/
[TutorialKit]: https://tutorialkit.dev
