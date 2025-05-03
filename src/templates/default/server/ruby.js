import { RubyVM } from "@ruby/wasm-wasi";
import { WASI } from "wasi";
import fs from "fs/promises";

const rubyWasm = "./node_modules/@ruby/3.4-wasm-wasi/dist/ruby+stdlib.wasm";

export default async function initVM() {
  const binary = await fs.readFile(rubyWasm);
  const module = await WebAssembly.compile(binary);

  const wasi = new WASI(
    {
      env: {"RUBYOPT": "-EUTF-8 -W0 -I/project"},
      version: "preview1",
      returnOnExit: true,
      preopens: {
        "/project": process.cwd() + "/project"
      }
    }
  );
  const { vm } = await RubyVM.instantiateModule({
    module, wasip1: wasi
  });

  const nanotest = await fs.readFile(new URL("./nanotest.rb", import.meta.url), "utf8");
  vm.eval(nanotest)

  return vm;
}
