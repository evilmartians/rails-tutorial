import "./style.css";
import initVM from "./ruby.js";
const rubyFiles = import.meta.glob("./**/*.rb", { query: "?raw" });

const terminalEl = document.querySelector("#app")!;

function printLine(...lines: string[]) {
  for (const line of lines) {
    const p = document.createElement("p");
    p.textContent = line;
    terminalEl.appendChild(p);
  }
}

function printError(msg: string) {
  const p = document.createElement("p");
  p.textContent = msg;
  p.classList.add("error");
  terminalEl.appendChild(p);
}

printLine("Initializing ruby.wasm...");
const vm = await initVM(
  function (line: string) {
    printLine(line);
    console.log(line);
  },
  function (line: string) {
    printLine(line);
    console.warn(line);
  }
);

printLine(`ruby.wasm initialized: ${vm.eval("RUBY_DESCRIPTION").toString()}`);
printLine("");

try {
  const tests: string[] = [];

  for(const path in rubyFiles) {
    const source = (await rubyFiles[path]()).default;
    if (path.endsWith("_test.rb")) {
      tests.push(source)
    } else {
      vm.eval(source)
    }
  }

  for(let testSource of tests) {
    vm.eval(testSource)
  }
} catch (e) {
  printError(e.toString());
}
