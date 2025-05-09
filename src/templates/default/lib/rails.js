import { RubyVM } from "@ruby/wasm-wasi";
import { WASI } from "wasi";
import fs from "fs/promises";

const rubyWasm = new URL("../node_modules/@rails-tutorial/wasm/dist/rails.wasm", import.meta.url).pathname;

export default async function initVM(vmopts = {}) {
  const { env, args } = vmopts;
  const binary = await fs.readFile(rubyWasm);
  const module = await WebAssembly.compile(binary);

  const workspaceDir = new URL("../workspace", import.meta.url).pathname;
  const workdir = process.cwd().startsWith(workspaceDir) ?
    `/workspace${process.cwd().slice(workspaceDir.length)}` :
    "";

  const wasi = new WASI(
    {
      env: {"RUBYOPT": "-EUTF-8 -W0", ...env},
      version: "preview1",
      returnOnExit: true,
      preopens: {
        "/workspace": workspaceDir
      },
      args: args || [] // FIXME: doesn't work
    }
  );
  const { vm } = await RubyVM.instantiateModule({
    module, wasip1: wasi
  });

  vm.eval(`
    Dir.chdir("${workdir}") unless "${workdir}".empty?
    require "/rails-vm/boot"

    require "js"
  `)

  return vm;
}
