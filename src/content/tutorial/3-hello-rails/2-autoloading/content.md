---
type: lesson
title: Autoloading in Development
editor: false
terminal: false
---

Autoloading in Development
----------------

Developer happiness is a cornerstone philosophy of Rails and one way of
achieving this is with automatic code reloading in development.

Once you start the Rails server, new files or changes to existing files are
detected and automatically loaded or reloaded as necessary. This allows you to
focus on building without having to restart your Rails server after every
change.

You may also notice that Rails applications rarely use `require` statements like
you may have seen in other programming languages. Rails uses naming conventions
to require files automatically so you can focus on writing your application
code.

See
[Autoloading and Reloading Constants](https://guides.rubyonrails.org/autoloading_and_reloading_constants.html)
for more details.
