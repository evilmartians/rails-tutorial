---
type: lesson
title: MVC Basics
editor: false
custom:
  shell:
    workdir: "/workspace/store"
---

Model-View-Controller Basics
----------------------------

Rails code is organized using the Model-View-Controller (MVC) architecture. With
MVC, we have three main concepts where the majority of our code lives:

* Model - Manages the data in your application. Typically, your database tables.
* View - Handles rendering responses in different formats like HTML, JSON, XML,
  etc.
* Controller - Handles user interactions and the logic for each request.

<picture class="flowdiagram">
  <source srcset="/images/getting_started/mvc_architecture_dark.jpg" media="(prefers-color-scheme:dark)"/>
  <img src="/images/getting_started/mvc_architecture_light.jpg"/>
</picture>

Now that we've got a basic understanding of MVC, let's see how it's used in
Rails.
