import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react';
import tutorialStore from 'tutorialkit:store';

type ShellConfig = Partial<{
  workdir: string
}>;

export const ShellConfigurator: React.FC = () => {
  const boot = useStore(tutorialStore.bootStatus)
  const [state, set] = useState(0);
  const terminalConfig = tutorialStore.terminalConfig.get()

  useEffect(() => {
    const unlisten = tutorialStore.terminalConfig.listen(() => {
      set(state + 1);
    })
    return unlisten
  }, [terminalConfig])

  if (boot !== "booted") return;

  const terminal = terminalConfig.panels.find(panel => panel.type === 'terminal');
  if (!terminal || !terminal.process) return;

  const conf = tutorialStore.lesson?.data?.custom?.shell as ShellConfig

  if (conf) {
    const workdir = conf.workdir;

    if (workdir) {
      terminal.input(`cd /home/tutorial${workdir} && clear\n`);
    }
  }

  return null;
};
