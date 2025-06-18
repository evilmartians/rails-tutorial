---
type: lesson
title: Internationalization (I18n)
focus: /workspace/store/app/views/products/index.html.erb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Internationalization (I18n)

Rails makes it easy to translate your app into other languages.

The `translate` or `t` helper in our views looks up a translation by name and returns the text for the current locale.

In `app/views/products/index.html.erb`, let's update the header tag to use a translation.

```erb ins={1} del={1}
<h1>Products</h1>
<h1><%= t "hello" %></h1>
<%= link_to "New product", new_product_path if authenticated? %>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <%= link_to product.name, product %>
    </div>
  <% end %>
</div>
```

Refreshing the page, we see `Hello world` is the header text now. Where did that come from?

Since the default language is in English, Rails looks in `config/locales/en.yml` (which was created during `rails new`) for a matching key under the locale.

```yaml
en:
  hello: "Hello world"
```

Let's create a new locale file in our editor for Spanish and add a translation in `config/locales/es.yml`.

```yaml
es:
  hello: "Hola mundo"
```

We need to tell Rails which locale to use. The simplest option is to look for a locale param in the URL. We can do this in `app/controllers/application_controller.rb` with the following:

```ruby ins={3-7}
class ApplicationController < ActionController::Base
  # ...
  around_action :switch_locale

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
```

This will run every request and look for `locale` in the params or fallback to the default locale. It sets the locale for the request and resets it after it's finished.

- Visit http://localhost:3000/products?locale=en, you will see the English translation.
- Visit http://localhost:3000/products?locale=es, you will see the Spanish translation.
- Visit http://localhost:3000/products without a locale param, it will fallback to English.

Let's update the index header to use a real translation instead of `"Hello world"`.

```erb ins={1} del={1}
<h1><%= t "hello" %></h1>
<h1><%= t ".title" %></h1>
<%= link_to "New product", new_product_path if authenticated? %>

<div id="products">
  <% @products.each do |product| %>
    <div>
      <%= link_to product.name, product %>
    </div>
  <% end %>
</div>
```

Notice the `.` before `title`? This tells Rails to use a relative locale lookup. Relative lookups include the controller and action automatically in the key so you don't have to type them every time. For `.title` with the English locale, it will look up `en.products.index.title`.

In `config/locales/en.yml` we want to add the `title` key under `products` and `index` to match our controller, view, and translation name.

```yaml ins={3-6} del={2}
en:
  hello: "Hello world"
  hello: "Hello world"
  products:
    index:
      title: "Products"
```

In the Spanish locales file, we can do the same thing:

```yaml ins={3-6} del={2}
es:
  hello: "Hola mundo"
  hello: "Hola mundo"
  products:
    index:
      title: "Productos"
```

You'll now see "Products" when viewing the English locale and "Productos" when viewing the Spanish locale.

## How Rails I18n Works

Rails internationalization works through:

1. **Locale files** - YAML files containing translations for each language
2. **Translation helpers** - `t()` and `translate()` methods in views and controllers
3. **Locale switching** - Mechanism to change the current locale
4. **Fallbacks** - Default language when translations are missing
5. **Pluralization** - Handle singular/plural forms in different languages

### Key Features

- **Relative lookups** - Use `.key` for automatic scoping based on controller/action
- **Interpolation** - Insert variables into translations: `t('hello', name: 'World')`
- **Pluralization** - Handle different plural rules per language
- **Date/time formatting** - Locale-specific date and time formats
- **Number formatting** - Currency and number formatting per locale

### Best Practices

- Use descriptive translation keys
- Organize translations hierarchically
- Provide fallback translations
- Test with different locales
- Consider right-to-left languages for full internationalization

Try switching between English and Spanish by adding `?locale=en` or `?locale=es` to your URLs!