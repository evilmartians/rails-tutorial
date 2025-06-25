import { useStore } from '@nanostores/react';
import tutorialStore from 'tutorialkit:store';
import { useRef, useEffect } from 'react';
import { webcontainer } from 'tutorialkit:core';
import type { WebContainer } from '@webcontainer/api';

export function FileManager() {
  const files = useStore(tutorialStore.files);
  const processedFiles = useRef(new Set<string>());
  const wasmCached = useRef(false);
  const cachingInterval = useRef<number | null>(null);

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
      const fileHandle = await opfsRoot.getFileHandle('rails.wasm');
      const file = await fileHandle.getFile();
      return new Uint8Array(await file.arrayBuffer());
    } catch {
      return null;
    }
  }

  async function persistWasmFile(wasmData: Uint8Array): Promise<void> {
    try {
      const opfsRoot = await navigator.storage.getDirectory();
      const fileHandle = await opfsRoot.getFileHandle('rails.wasm', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(wasmData);
      await writable.close();
      console.log('Rails WASM cached');
    } catch (error) {
      console.error('Failed to persist Rails WASM:', error);
    }
  }

  async function cacheWasmFile(wc: WebContainer): Promise<void> {
    if (cachingInterval.current) return;

    console.log('Caching WASM file...');

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
          await wc.fs.writeFile('rails.wasm', cachedWasm);
          console.log('Rails WASM loaded from cache');
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
