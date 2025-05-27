import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const themeJson = readFileSync(
  new URL('../dist/dark/index.json', import.meta.url),
  'utf8',
);

const theme = JSON.parse(themeJson);

const usedIconSet = new Set([
  theme.file,
  theme.folder,
  theme.folderExpanded,
  theme.rootFolder,
  theme.rootFolderExpanded,
  ...Object.values(theme.languageIds),
  ...Object.values(theme.fileExtensions),
  ...Object.values(theme.fileNames),
  ...Object.values(theme.folderNames),
  ...Object.values(theme.folderNamesExpanded),
]);

const iconList = readdirSync(new URL('../src/icons', import.meta.url), {
  encoding: 'utf8',
});

const unusedIconList = [];

for (const icon of iconList) {
  if (!usedIconSet.has(path.basename(icon, '.svg'))) {
    unusedIconList.push(icon);
  }
}

console.log(unusedIconList);
