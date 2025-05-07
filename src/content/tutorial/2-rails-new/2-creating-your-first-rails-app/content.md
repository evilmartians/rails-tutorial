---
type: lesson
title: Creating your first Rails app
custom:
  shell:
    workdir: "/workspace"
---

Creating Your First Rails App
-----------------------------

Rails comes with several commands to make life easier. Run `rails --help` to see
all of the commands.

`rails new` generates the foundation of a fresh Rails application for you, so
let's start there.

To create our `store` application, run the following command in your terminal:

```bash
$ rails new store
```

:::info
You can customize the application Rails generates by using flags. To see
these options, run `rails new --help`.
:::

After your new application is created, switch to its directory:

```bash
$ cd store
```

### Directory Structure

Let's take a quick glance at the files and directories that are included in a
new Rails application. You can open this folder in your code editor or run
`ls -la` in your terminal to see the files and directories.
| File/Folder | Purpose |
|------------|---------|
| app/ | Contains the controllers, models, views, helpers, mailers, jobs, and assets for your application. **You'll focus mostly on this folder for the remainder of this guide.** |
| bin/ | Contains the `rails` script that starts your app and can contain other scripts you use to set up, update, deploy, or run your application. |
| config/ | Contains configuration for your application's routes, database, and more. This is covered in more detail in [Configuring Rails Applications](configuring.html). |
| config.ru | [Rack](https://rack.github.io) configuration for Rack-based servers used to start the application. |
| db/ | Contains your current database schema, as well as the database migrations. |
| Dockerfile | Configuration file for Docker. |
| Gemfile | These files allow you to specify what gem dependencies are needed for your Rails application. These files are used by the [Bundler](https://bundler.io) gem. |
| Gemfile.lock | The lock file that ensures consistent gem versions across different environments. |
| lib/ | Extended modules for your application. |
| log/ | Application log files. |
| public/ | Contains static files and compiled assets. When your app is running, this directory will be exposed as-is. |
| Rakefile | This file locates and loads tasks that can be run from the command line. The task definitions are defined throughout the components of Rails. Rather than changing `Rakefile`, you should add your own tasks by adding files to the `lib/tasks` directory of your application. |
| README.md | This is a brief instruction manual for your application. You should edit this file to tell others what your application does, how to set it up, and so on. |
| script/ | Contains one-off or general purpose [scripts](https://github.com/rails/rails/blob/main/railties/lib/rails/generators/rails/script/USAGE) and [benchmarks](https://github.com/rails/rails/blob/main/railties/lib/rails/generators/rails/benchmark/USAGE). |
| storage/ | Contains SQLite databases and Active Storage files for Disk Service. This is covered in [Active Storage Overview](active_storage_overview.html). |
| test/ | Unit tests, fixtures, and other test apparatus. These are covered in [Testing Rails Applications](testing.html). |
| tmp/ | Temporary files (like cache and pid files). |
| vendor/ | A place for all third-party code. In a typical Rails application this includes vendored gems. |
| .dockerignore | This file tells Docker which files it should not copy into the container. |
| .gitattributes | This file defines metadata for specific paths in a Git repository. This metadata can be used by Git and other tools to enhance their behavior. See the [gitattributes documentation](https://git-scm.com/docs/gitattributes) for more information. |
| .git/ | Contains Git repository files. |
| .github/ | Contains GitHub specific files. |
| .gitignore | This file tells Git which files (or patterns) it should ignore. See [GitHub - Ignoring files](https://help.github.com/articles/ignoring-files) for more information about ignoring files. |
| .kamal/ | Contains Kamal secrets and deployment hooks. |
| .rubocop.yml | This file contains the configuration for RuboCop. |
| .ruby-version | This file contains the default Ruby version. |
