---
type: lesson
title: Controllers & Actions
custom:
  shell:
    workdir: "/workspace/store"
filesystem:
  watch: true
---

Controllers & Actions
---------------------

Now that we've defined routes for Products, let's implement the controller and
actions to handle requests to these URLs.

This command will generate a `ProductsController` with an index action. Since
we've already set up routes, we can skip that part of the generator using a
flag.

```bash
$ bin/rails generate controller Products index --skip-routes
```

This command generates a handful of files for our controller:

* The controller itself
* A views folder for the controller we generated
* A view file for the action we specified when generating the controller
* A test file for this controller
* A helper file for extracting logic in our views

Let's take a look at the ProductsController defined in
`app/controllers/products_controller.rb`. It should look like this:

```ruby
class ProductsController < ApplicationController
  def index
  end
end
```

:::info
You may notice the file name `products_controller.rb` is an underscored
version of the Class this file defines, `ProductsController`. This pattern helps
Rails to automatically load code without having to use `require` like you may
have seen in other languages.
:::

The `index` method here is an Action. Even though it's an empty method, Rails
will default to rendering a template with the matching name.

The `index` action will render `app/views/products/index.html.erb`. If we open
up that file in our code editor, we'll see the HTML it renders.

```erb
<h1>Products#index</h1>
<p>Find me in app/views/products/index.html.erb</p>
```
