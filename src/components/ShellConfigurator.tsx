import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react';
import tutorialStore from 'tutorialkit:store';

type ShellConfig = Partial<{
  workdir: string
}>;

export const ShellConfigurator: React.FC = () => {
  const boot = useStore(tutorialStore.bootStatus);
  const storeRef = useStore(tutorialStore.ref);
  const terminalConfig = useStore(tutorialStore.terminalConfig);
  const [state, set] = useState(0);

  useEffect(() => {
    const unlisten = tutorialStore.terminalConfig.listen(() => {
      set(state + 1);
    })
    return unlisten
  }, [terminalConfig])

  const lesson = tutorialStore.lesson;
  const terminal = terminalConfig.panels.find(panel => panel.type === 'terminal');

  useEffect(() => {
    if (boot !== "booted") return;

    if (!lesson) return;

    if (!terminal) return;

    const conf = lesson?.data?.custom?.shell as ShellConfig
    if (conf) {
      const { workdir } = conf;

      if (workdir) {
        terminal.input(`cd /home/tutorial${workdir} && clear\n`);
      }
    }
  }, [boot, terminalConfig, storeRef]);

  return null;
};
