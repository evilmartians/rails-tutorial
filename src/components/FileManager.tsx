import { useStore } from '@nanostores/react';
import tutorialStore from 'tutorialkit:store';
import { useRef, useEffect } from 'react';
import { webcontainer } from 'tutorialkit:core';
import type { WebContainer } from '@webcontainer/api';
import { RAILS_WASM_PACKAGE_VERSION } from '../templates/default/lib/constants';

export function FileManager() {
  const files = useStore(tutorialStore.files);
  const processedFiles = useRef(new Set<string>());
  const wasmCached = useRef(false);
  const cachingInterval = useRef<number | null>(null);
  const VERSIONED_RAILS_WASM_FILE_NAME = `rails-${RAILS_WASM_PACKAGE_VERSION}.wasm`;

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
      const fileHandle = await opfsRoot.getFileHandle(VERSIONED_RAILS_WASM_FILE_NAME);
      const file = await fileHandle.getFile();
      console.log(`Found cached WASM version ${RAILS_WASM_PACKAGE_VERSION}`);
      return new Uint8Array(await file.arrayBuffer());
    } catch {
      return null;
    }
  }

  async function persistWasmFile(wasmData: Uint8Array): Promise<void> {
    try {
      const opfsRoot = await navigator.storage.getDirectory();
      const fileHandle = await opfsRoot.getFileHandle(VERSIONED_RAILS_WASM_FILE_NAME, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(wasmData);
      await writable.close();
      console.log(`Rails WASM v${RAILS_WASM_PACKAGE_VERSION} cached`);
    } catch (error) {
      console.error('Failed to persist Rails WASM:', error);
    }
  }

  async function cacheWasmFile(wc: WebContainer): Promise<void> {
    if (cachingInterval.current) return;

    console.log(`Caching WASM file v${RAILS_WASM_PACKAGE_VERSION}...`);

    cachingInterval.current = window.setInterval(async () => {
      try {
        const wasmData = await wc.fs.readFile('/node_modules/@rails-tutorial/wasm/dist/rails.wasm');
        if (wasmData && wasmData.length > 0) {
          clearInterval(cachingInterval.current!);
          cachingInterval.current = null;

          await persistWasmFile(wasmData);
          wasmCached.current = true;
        }
      } catch (error) {
        // File not ready yet, continue checking
      }
    }, 1000);
  }

  useEffect(() => {
    if (!files) return;

    (async () => {
      const wc = await webcontainer;

      if (!wasmCached.current) {
        const cachedWasm = await fetchCachedWasmFile();
        if (cachedWasm) {
          await wc.fs.writeFile(VERSIONED_RAILS_WASM_FILE_NAME, cachedWasm);
          console.log(`Rails WASM v${RAILS_WASM_PACKAGE_VERSION} loaded from cache`);
          wasmCached.current = true;
        } else {
          await cacheWasmFile(wc);
        }
      }

      Object.entries(files).forEach(([_, fd]) => {
        const dir = fd.path.split('/').filter(Boolean).slice(-2, -1)[0];
        if (dir === "bin" && !processedFiles.current.has(fd.path)) {
          processedFiles.current = new Set([...processedFiles.current, fd.path]);
          chmodx(wc, '/home/tutorial' + fd.path);
        }
      });
    })();

    return () => {
      if (cachingInterval.current) {
        clearInterval(cachingInterval.current);
        cachingInterval.current = null;
      }
    };
  }, [files]);

  return null;
}
