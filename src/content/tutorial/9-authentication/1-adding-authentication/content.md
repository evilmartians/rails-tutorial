---
type: lesson
title: Adding Authentication
focus: /workspace/store
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

### Adding Authentication

Anyone can edit or delete products which isn't safe. Let's add some security by requiring a user to be authenticated to manage products.

Rails comes with an authentication generator that we can use. It creates User and Session models and the controllers and views necessary to login to our application.

Head back to your terminal and run the following command:

```bash
bin/rails generate authentication
```

Then migrate the database to add the User and Session tables.

```bash
bin/rails db:migrate
```

Open the Rails console to create a User.

```bash
bin/rails console
```

Use `User.create!` method to create a User in the Rails console. Feel free to use your own email and password instead of the example.

```ruby
User.create! email_address: "you@example.org", password: "s3cr3t", password_confirmation: "s3cr3t"
```

Restart your Rails server so it picks up the `bcrypt` gem added by the generator. BCrypt is used for securely hashing passwords for authentication.

```bash
bin/rails server
```

When you visit any page, Rails will prompt for a username and password. Enter the email and password you used when creating the User record.

Try it out by visiting http://localhost:3000/products/new

If you enter the correct username and password, it will allow you through. Your browser will also store these credentials for future requests so you don't have to type it in every page view.

## What the Authentication Generator Created

The Rails authentication generator created several files for us:

1. **User model** (`app/models/user.rb`) - Handles user authentication and password management
2. **Session model** (`app/models/session.rb`) - Tracks user sessions 
3. **ApplicationController changes** - Adds authentication logic to all controllers
4. **SessionsController** - Handles login and logout functionality
5. **Database migrations** - Creates the users and sessions tables
6. **Routes** - Adds authentication-related routes

The generator uses HTTP Basic Authentication by default, which is why you see a browser dialog for username and password. This provides simple but effective authentication for your application.