---
type: lesson
title: Extracting a Concern
focus: /workspace/store/app/models/product.rb
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Extracting a Concern

The Product model now has a decent amount of code for handling notifications. To better organize our code, we can extract this to an `ActiveSupport::Concern`. A Concern is a Ruby module with some syntactic sugar to make using them easier.

First let's create the Notifications module.

Create a file at `app/models/product/notifications.rb` with the following:

```ruby
module Product::Notifications
  extend ActiveSupport::Concern

  included do
    has_many :subscribers, dependent: :destroy
    after_update_commit :notify_subscribers, if: :back_in_stock?
  end

  def back_in_stock?
    inventory_count_previously_was == 0 && inventory_count > 0
  end

  def notify_subscribers
    subscribers.each do |subscriber|
      ProductMailer.with(product: self, subscriber: subscriber).in_stock.deliver_later
    end
  end
end
```

When you include a module in a class, any code inside the `included` block runs as if it's part of that class. At the same time, the methods defined in the module become regular methods you can call on objects (instances) of that class.

Now that the code triggering the notification has been extracted into the Notification module, the Product model can be simplified to include the Notifications module.

```ruby ins={2} del={5-16}
class Product < ApplicationRecord
  include Notifications

  has_one_attached :featured_image
  has_rich_text :description
  has_many :subscribers, dependent: :destroy
  validates :name, presence: true
  validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }

  after_update_commit :notify_subscribers, if: :back_in_stock?

  def back_in_stock?
    inventory_count_previously_was.zero? && inventory_count > 0
  end

  def notify_subscribers
    subscribers.each do |subscriber|
      ProductMailer.with(product: self, subscriber: subscriber).in_stock.deliver_later
    end
  end
end
```

Concerns are a great way to organize features of your Rails application. As you add more features to the Product, the class will become messy. Instead, we can use Concerns to extract each feature out into a self-contained module like `Product::Notifications` which contains all the functionality for handling subscribers and how notifications are sent.

Extracting code into concerns also helps make features reusable. For example, we could introduce a new model that also needs subscriber notifications. This module could be used in multiple models to provide the same functionality.

## Understanding Rails Concerns

Concerns provide several benefits:

1. **Code organization** - Keep related functionality together
2. **Reusability** - Share functionality across multiple models
3. **Separation of concerns** - Each module handles one responsibility
4. **Testing** - Easier to test individual pieces of functionality
5. **Maintainability** - Smaller, focused files are easier to maintain

### Best Practices

- **Single responsibility** - Each concern should handle one feature
- **Clear naming** - Use descriptive module names
- **Logical grouping** - Group related methods and callbacks together
- **Documentation** - Include comments explaining the concern's purpose

Now your Product model is cleaner and the notification functionality is properly organized!