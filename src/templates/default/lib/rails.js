import { RubyVM } from "@ruby/wasm-wasi";
import { WASI } from "wasi";
import fs from "fs/promises";
import { setupDatabase } from "./database.js";

const rubyWasm = new URL("../node_modules/@rails-tutorial/wasm/dist/rails.wasm", import.meta.url).pathname;

const railsRootDir = new URL("../workspace/store", import.meta.url).pathname;
const pgDataDir = new URL("../pgdata", import.meta.url).pathname;

export default async function initVM(vmopts = {}) {
  const { env, args, skipRails } = vmopts;
  const binary = await fs.readFile(rubyWasm);
  const module = await WebAssembly.compile(binary);

  const RAILS_ENV = env?.RAILS_ENV || "development";

  const workspaceDir = new URL("../workspace", import.meta.url).pathname;
  const workdir = process.cwd().startsWith(workspaceDir) ?
    `/workspace${process.cwd().slice(workspaceDir.length)}` :
    "";

  const cliArgs = args?.length ? ['ruby.wasm'].concat(args) : undefined;

  const wasi = new WASI(
    {
      env: {"RUBYOPT": "-EUTF-8 -W0", ...env},
      version: "preview1",
      returnOnExit: true,
      preopens: {
        "/workspace": workspaceDir
      },
      args: cliArgs
    }
  );

  const { vm } = await RubyVM.instantiateModule({
    module,
    wasip1: wasi,
    args: cliArgs
  });

  if (!skipRails) {
    try {
      await fs.readdir(railsRootDir);
      await setupDatabase(pgDataDir);
    } catch (error) {
      // not database directory — skip it
    }

    vm.eval(`
      Dir.chdir("${workdir}") unless "${workdir}".empty?
      require "/rails-vm/boot"

      require "js"
    `)
  }

  return vm;
}
