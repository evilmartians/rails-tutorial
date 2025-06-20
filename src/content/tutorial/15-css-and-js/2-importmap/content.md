---
type: lesson
title: Import Maps
focus: /workspace/store/config/importmap.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Import Maps

Rails uses import maps for JavaScript by default. This allows you to write
modern JavaScript modules with no build steps.

You can find the JavaScript pins in `config/importmap.rb`. This file maps the
JavaScript package names with the source file which is used to generate the
importmap tag in the browser.

```ruby
# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "trix"
pin "@rails/actiontext", to: "actiontext.esm.js"
```

:::tip
Each pin maps a JavaScript package name (e.g., `"@hotwired/turbo-rails"`)
to a specific file or URL (e.g., `"turbo.min.js"`). `pin_all_from` maps all
files in a directory (e.g., `app/javascript/controllers`) to a namespace (e.g.,
`"controllers"`).
:::

Import maps keep the setup clean and minimal, while still supporting modern
JavaScript features.

What are these JavaScript files already in our import map? They are a frontend
framework called Hotwire that Rails uses by default.
