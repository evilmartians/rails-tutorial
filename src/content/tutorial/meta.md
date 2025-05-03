---
type: tutorial
mainCommand: ['npm run test:watch', 'Run Ruby tests']
prepareCommands:
  - ['npm install', 'Installing dependencies']
previews: false
filesystem:
  watch: ['/*.json', '/project/**/*']
terminal:
  open: true
  activePanel: 0
  panels:
    - ['output', 'Test Output']
    - type: terminal
      id: 'cmds'
      title: 'Command Line'
      allowRedirects: true
---
