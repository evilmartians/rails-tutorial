import { useEffect } from 'react';
import tutorialStore from 'tutorialkit:store';
import { webcontainer } from 'tutorialkit:core';

export const TerminalConfigurator: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      await webcontainer;
      const terminal = tutorialStore.terminalConfig.value!.panels.find(panel => panel.type === 'terminal');
      if (!terminal) return;

      terminal.input('export PATH=/home/tutorial/bin:$PATH && clear\n');
      clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};
