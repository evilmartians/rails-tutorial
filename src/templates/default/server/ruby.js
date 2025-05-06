import { RubyVM } from "@ruby/wasm-wasi";
import { WASI } from "wasi";
import fs from "fs/promises";

const rubyWasm = "./node_modules/@rails-tutorial/wasm/dist/rails.wasm";

export default async function initVM(vmopts = {}) {
  const { env, args } = vmopts;
  const binary = await fs.readFile(rubyWasm);
  const module = await WebAssembly.compile(binary);

  const wasi = new WASI(
    {
      env: {"RUBYOPT": "-EUTF-8 -W0 -I/project", ...env},
      version: "preview1",
      returnOnExit: true,
      preopens: {
        "/project": process.cwd() + "/project"
      },
      args: args || [] // FIXME: doesn't work
    }
  );
  const { vm } = await RubyVM.instantiateModule({
    module, wasip1: wasi
  });

  vm.eval(`
    require "/rails-vm/boot"
  `)

  const nanotest = await fs.readFile(new URL("./nanotest.rb", import.meta.url), "utf8");
  vm.eval(nanotest)

  return vm;
}
