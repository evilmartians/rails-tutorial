import { useStore } from '@nanostores/react'
import tutorialStore from 'tutorialkit:store';
import { useRef, useEffect } from 'react';
import { webcontainer } from 'tutorialkit:core';
import type { WebContainer } from '@webcontainer/api';

export function FileManager() {
  const files = useStore(tutorialStore.files);
  const processedFiles = useRef(new Set<string>());

  async function chmodx(wc: WebContainer, path: string) {
    const process = await wc.spawn('chmod', ['+x', path]);

    const exitCode = await process.exit;

    if (exitCode !== 0) {
      console.error(`failed to chmox +x ${path}: `, exitCode)
    } else {
      console.log(`updated permissions for: ${path}`)
    }
  }

  useEffect(() => {
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
    })();
  }, [files]);

  return null;
}
