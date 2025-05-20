---
type: lesson
title: Meet the Rails server!
previews:
  - 3000
custom:
  shell:
    workdir: "/workspace/store"
---

Hello, Rails!
-------------

Let's start easy by creating our application's database and boot up our Rails server for the first time.

In your terminal, run the following commands in the `store` directory:

```bash
$ bin/rails db:create
```

This will initially create the application's database.

```bash
$ bin/rails server
```

NOTE: When we run commands inside an application directory, we should use
`bin/rails`. This makes sure the application's version of Rails is used.

This will start up a web server that will serve static files and
your Rails application:

```bash
=> Booting WASIServer
=> Rails 8.1.0 application starting in development
=> Run `bin/rails server --help` for more startup options
Express.js server started on port 3000
Use Ctrl-C to stop
```

In the preview pane to your right you should see the default Rails welcome page. If you can see it—everything works as expected!

This page is the *smoke test* for a new Rails application, ensuring that
everything is working behind the scenes to serve a page.

To stop the Rails server anytime, press `Ctrl-C` in your terminal.
