import { useStore } from '@nanostores/react';
import tutorialStore from 'tutorialkit:store';
import { useRef, useEffect } from 'react';
import { webcontainer } from 'tutorialkit:core';
import type { WebContainer } from '@webcontainer/api';

const VERSIONED_WASM_URL = `/rails.wasm`;
const WASM_CACHE_FILE_NAME = `rails.wasm`;
const WC_WASM_LOG_PATH = `/ruby.wasm.log.txt`;
const WC_WASM_PATH = `/ruby.wasm`;

export function FileManager() {
  const lessonLoaded = useStore(tutorialStore.lessonFullyLoaded);
  const files = useStore(tutorialStore.files);
  const processedFiles = useRef(new Set<string>());
  const wasmCached = useRef(false);

  async function chmodx(wc: WebContainer, path: string) {
    const process = await wc.spawn('chmod', ['+x', path]);

    const exitCode = await process.exit;

    if (exitCode !== 0) {
      console.error(`failed to chmox +x ${path}: `, exitCode)
    } else {
      console.log(`updated permissions for: ${path}`)
    }
  }

  async function fetchCachedWasmFile(): Promise<Uint8Array | null> {
    try {
      const opfsRoot = await navigator.storage.getDirectory();
      const fileHandle = await opfsRoot.getFileHandle(WASM_CACHE_FILE_NAME);
      const file = await fileHandle.getFile();
      console.log(`Found cached Ruby WASM: ${WASM_CACHE_FILE_NAME}`);
      return new Uint8Array(await file.arrayBuffer());
    } catch {
      return null;
    }
  }

  async function persistWasmFile(wasmData: Uint8Array): Promise<void> {
    try {
      const opfsRoot = await navigator.storage.getDirectory();
      const fileHandle = await opfsRoot.getFileHandle(WASM_CACHE_FILE_NAME, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(wasmData);
      await writable.close();
      console.log(`Ruby WASM file ${WASM_CACHE_FILE_NAME} cached`);
    } catch (error) {
      console.error('Failed to persist Ruby WASM:', error);
    }
  }

  async function cacheWasmFile(wc: WebContainer): Promise<void> {
    console.log(`Dowloading WASM file ${VERSIONED_WASM_URL}...`);

    try {
      const wasm = await fetch(VERSIONED_WASM_URL);
      await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: downloaded');
      const wasmData = new Uint8Array(await wasm.arrayBuffer());
      await persistWasmFile(wasmData);
      await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: cached');
      await wc.fs.writeFile(WC_WASM_PATH, wasmData);
    } catch(err) {
      await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: error');
    }
  }

  useEffect(() => {
    if (!lessonLoaded) return;
    if (!files) return;

    (async () => {
      const wc = await webcontainer;

      Object.entries(files).forEach(([_, fd]) => {
        const dir = fd.path.split('/').filter(Boolean).slice(-2, -1)[0];
        if (dir === "bin" && !processedFiles.current.has(fd.path)) {
          processedFiles.current = new Set([...processedFiles.current, fd.path]);
          chmodx(wc, '/home/tutorial' + fd.path);
        }
      });

      if (!wasmCached.current) {
        await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: init');
        const cachedWasm = await fetchCachedWasmFile();
        if (cachedWasm) {
          await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: load from cache');
          await wc.fs.writeFile(WC_WASM_PATH, cachedWasm);
          await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: done');
          console.log(`Ruby WASM ${WASM_CACHE_FILE_NAME} loaded from cache`);
          wasmCached.current = true;
        } else {
          await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: download');
          await cacheWasmFile(wc);
          await wc.fs.writeFile(WC_WASM_LOG_PATH, 'status: done');
        }
      }
    })();

    return () => {};
  }, [lessonLoaded, files]);

  return null;
}
