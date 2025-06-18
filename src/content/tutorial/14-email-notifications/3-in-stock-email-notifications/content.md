---
type: lesson
title: In Stock Email Notifications
focus: /workspace/store
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### In Stock Email Notifications

Action Mailer is a feature of Rails that allows you to send emails. We'll use it to notify subscribers when a product is back in stock.

We can generate a mailer with the following command:

```bash
bin/rails g mailer Product in_stock
```

This generates a class at `app/mailers/product_mailer.rb` with an `in_stock` method.

Update this method to mail to a subscriber's email address.

```ruby ins={10-12}
class ProductMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.product_mailer.in_stock.subject
  #
  def in_stock
    @product = params[:product]
    mail to: params[:subscriber].email
  end
end
```

The mailer generator also generates two email templates in our views folder: one for HTML and one for Text. We can update those to include a message and link to the product.

Change `app/views/product_mailer/in_stock.html.erb` to:

```erb
<h1>Good news!</h1>
<p><%= link_to @product.name, product_url(@product) %> is back in stock.</p>
```

And `app/views/product_mailer/in_stock.text.erb` to:

```erb
Good news!
<%= @product.name %> is back in stock.
<%= product_url(@product) %>
```

We use `product_url` instead of `product_path` in mailers because email clients need to know the full URL to open in the browser when the link is clicked.

We can test an email by opening the Rails console and loading a product and subscriber to send to:

```ruby
product = Product.first
subscriber = product.subscribers.find_or_create_by(email: "subscriber@example.org")
ProductMailer.with(product: product, subscriber: subscriber).in_stock.deliver_later
```

You'll see that it prints out an email in the logs.

To trigger these emails, we can use a callback in the Product model to send emails anytime the inventory count changes from 0 to a positive number.

```ruby ins={7-16}
class Product < ApplicationRecord
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

`after_update_commit` is an Active Record callback that is fired after changes are saved to the database. `if: :back_in_stock?` tells the callback to run only if the `back_in_stock?` method returns true.

Active Record keeps track of changes to attributes so `back_in_stock?` checks the previous value of `inventory_count` using `inventory_count_previously_was`. Then we can compare that against the current inventory count to determine if the product is back in stock.

`notify_subscribers` uses the Active Record association to query the `subscribers` table for all subscribers for this specific product and then queues up the `in_stock` email to be sent to each of them.

## How Action Mailer Works

Action Mailer provides a complete email solution:

1. **Mailer classes** - Like controllers but for emails
2. **Email templates** - HTML and text versions of emails
3. **Background delivery** - `deliver_later` for async email sending
4. **URL helpers** - Generate full URLs for email links
5. **Testing support** - Built-in tools for testing email functionality

### Key Features

- **Template rendering** - Use ERB templates like views
- **Attachments** - Send files with emails
- **Layouts** - Shared email layouts
- **Internationalization** - Multi-language email support
- **Delivery methods** - SMTP, SendGrid, Amazon SES, etc.

Now when you update a product's inventory from 0 to any positive number, all subscribers will automatically receive an email notification!