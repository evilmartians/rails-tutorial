---
type: lesson
title: Allowing Unauthenticated Access
focus: /workspace/store/app/controllers/products_controller.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Allowing Unauthenticated Access

However, our store's product index and show pages should be accessible to
everyone. By default, the Rails authentication generator will restrict all pages
to authenticated users only.

To allow guests to view products, we can allow unauthenticated access in our
controller.

```ruby ins={2}
class ProductsController < ApplicationController
  allow_unauthenticated_access only: %i[ index show ]
  # ...
end
```

Log out and visit the products index and show pages to see they're accessible
without being authenticated.
