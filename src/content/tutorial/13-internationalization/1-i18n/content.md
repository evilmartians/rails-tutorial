---
type: lesson
title: I18n
focus: /workspace/store/app/views/products/index.html.erb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

Internationalization (I18n)
---------------------------

Rails makes it easy to translate your app into other languages.

The `translate` or `t` helper in our views looks up a translation by name and
returns the text for the current locale.

In `app/views/products/index.html.erb`, let's update the header tag to use a
translation.

```erb
<h1><%= t "hello" %></h1>
```

Refreshing the page, we see `Hello world` is the header text now. Where did that
come from?

Since the default language is in English, Rails looks in `config/locales/en.yml`
(which was created during `rails new`) for a matching key under the locale.

```yaml
en:
  hello: "Hello world"
```

Let's create a new locale file in our editor for Spanish and add a translation
in `config/locales/es.yml`.

```yaml
es:
  hello: "Hola mundo"
```

We need to tell Rails which locale to use. The simplest option is to look for a
locale param in the URL. We can do this in
`app/controllers/application_controller.rb` with the following:

```ruby ins={4,6-9}
class ApplicationController < ActionController::Base
  # ...

  around_action :switch_locale

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
```

This will run every request and look for `locale` in the params or fallback to
the default locale. It sets the locale for the request and resets it after it's
finished.

* Visit http://localhost:3000/products?locale=en, you will see the English
  translation.
* Visit http://localhost:3000/products?locale=es, you will see the Spanish
  translation.
* Visit http://localhost:3000/products without a locale param, it will fallback
  to English.

Let's update the index header to use a real translation instead of
`"Hello world"`.

```erb
<h1><%= t ".title" %></h1>
```

TIP: Notice the `.` before `title`? This tells Rails to use a relative locale
lookup. Relative lookups include the controller and action automatically in the
key so you don't have to type them every time. For `.title` with the English
locale, it will look up `en.products.index.title`.

In `config/locales/en.yml` we want to add the `title` key under `products` and
`index` to match our controller, view, and translation name.

```yaml
en:
  hello: "Hello world"
  products:
    index:
      title: "Products"
```

In the Spanish locales file, we can do the same thing:

```yaml
es:
  hello: "Hola mundo"
  products:
    index:
      title: "Productos"
```

You'll now see "Products" when viewing the English locale and "Productos" when
viewing the Spanish locale.

Learn more about the [Rails Internationalization (I18n) API](https://guides.rubyonrails.org/i18n.html).
