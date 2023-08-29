import { createRequire } from 'node:module';
import { Binary } from './binary-install.js';
import os from 'node:os';
import path from 'node:path';

function getPlatform() {
  const type = os.type();
  const arch = os.arch();

  if (type === 'Linux' && arch === 'x64') {
    return {
      platform: 'blockpose-linux-x64',
      name: 'blockpose',
    };
  }

  if (type === 'Darwin' && arch === 'x64') {
    return {
      platform: 'blockpose-darwin-amd64',
      name: 'blockpose',
    };
  }

  if (type === 'Darwin' && arch === 'arm64') {
    return {
      platform: 'blockpose-darwin-arm64',
      name: 'blockpose',
    };
  }

  throw new Error(`Unsupported platform: ${type} ${arch}`);
}

export function getBinary() {
  const { platform, name } = getPlatform();
  const customRequire = createRequire(import.meta.url);

  const { name: packageName, version } = customRequire('../package.json');

  const url = `https://github.com/keltlabs/blockpose/releases/download/v${version}/${platform}.tar.gz`;
  const installDirectory = path.join(os.homedir(), '.blockpose');

  return new Binary(url, { name, installDirectory });
}
