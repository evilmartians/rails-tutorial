#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

const RAILS_WASM_PATH = './rails.wasm';
const TARGET_DIR = 'node_modules/@rails-tutorial/wasm/dist';
const TARGET_FILE = path.join(TARGET_DIR, 'rails.wasm');

async function checkIfFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveFile(src, dest) {
  try {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.rename(src, dest);
    return true;
  } catch (error) {
    console.error(`✗ Failed to move ${src} to ${dest}:`, error.message);
    return false;
  }
}

async function installPackage(packageName, version) {
  try {
    console.log(`Installing ${packageName}@${version}...`);
    execSync(`npm install ${packageName}@${version}`, { stdio: 'inherit' });
    console.log(`✓ Installed ${packageName}@${version}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to install ${packageName}@${version}:`, error.message);
    return false;
  }
}

async function main() {
  const railsWasmExists = await checkIfFileExists(RAILS_WASM_PATH);

  if (railsWasmExists) {
    const success = await moveFile(RAILS_WASM_PATH, TARGET_FILE);
    if (!success) {
      process.exit(1);
    }
  } else {
    const success = await installPackage('@rails-tutorial/wasm', '8.0.2-pre.2');
    if (!success) {
      process.exit(1);
    }
  }
}

main().catch(error => {
  console.error('Preinstall script failed:', error);
  process.exit(1);
});
