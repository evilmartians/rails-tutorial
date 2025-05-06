# @rails-tutorial-wasm NPM package

To create a `rails.wasm` module with Ruby and Rails included, run the following commands:

```sh
bundle install
bin/pack
```

Then, you can publish the NPM package containing the `rails.wasm` file as follows:

```sh
npm publish
```

## Prerequisites

To build and pack Ruby Wasm modules, you need the following:

- Rust toolchain:

  ```sh
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

- [wasi-vfs](https://github.com/kateinoigakukun/wasi-vfs)
