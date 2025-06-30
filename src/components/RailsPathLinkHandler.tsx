import { useEffect } from 'react';
import tutorialStore from "tutorialkit:store";

export default function RailsPathLinkHandler() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const link = target.closest('.rails-path-link');

      if (link) {
        event.preventDefault();

        const railsPath = link.getAttribute('data-rails-path');
        if (railsPath) {
          tutorialStore.setSelectedFile(`/workspace/store/${railsPath}`);
        }
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
