import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  type WriteFileOptions,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

type MaybePath = string | URL;

const pathFrom = (maybePath: MaybePath) => {
  if (maybePath instanceof URL) {
    return fileURLToPath(maybePath);
  }

  return maybePath;
};

export const writeFileSyncRec = (
  filename: MaybePath,
  data: string,
  options: WriteFileOptions = 'utf8',
): void => {
  const filenamePath = pathFrom(filename);
  mkdirSync(path.dirname(filenamePath), { recursive: true });
  writeFileSync(filenamePath, data, options);
};

export const copyDirSyncRec = (src: MaybePath, dest: MaybePath): void => {
  mkdirSync(dest, { recursive: true });

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(pathFrom(src), entry.name);

    const destPath = path.join(pathFrom(dest), entry.name);

    if (entry.isDirectory()) {
      copyDirSyncRec(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
};
