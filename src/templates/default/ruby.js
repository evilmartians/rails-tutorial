import { RubyVM } from "@ruby/wasm-wasi";
import { File, WASI, OpenFile, ConsoleStdout } from "@bjorn3/browser_wasi_shim";
import rubyUrl from "./node_modules/@ruby/3.4-wasm-wasi/dist/ruby+stdlib.wasm?url";

import assertions from "./lib/assertions.rb?raw";

export default async function initVM(setStdout, setStderr) {
  console.log("Initializing ruby.wasm...");

  console.log("Loading Wasm module...");
  const module = await WebAssembly.compileStreaming(fetch(rubyUrl));
  console.log("Wasm module loaded");

  const fds = [
    new OpenFile(new File([])), // stdin
    ConsoleStdout.lineBuffered(setStdout),
    ConsoleStdout.lineBuffered(setStderr),
  ];
  const wasi = new WASI([], [], fds, { debug: false });
  const { vm, instance } = await RubyVM.instantiateModule({
    module, wasip1: wasi
  });

  wasi.initialize(instance);
  vm.initialize(["ruby.wasm", "-e_=0", "-EUTF-8", "-W0"]);
  console.log("ruby.wasm initialized");

  vm.eval(assertions)

  return vm;
}
