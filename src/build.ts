import path from 'node:path';
import { URL } from 'node:url';
import { readdirSync, rmSync } from 'node:fs';
import { commonIcons } from './iconConfigs/commonIcons.ts';
import { folderIcons } from './iconConfigs/folderIcons.ts';
import { fileIcons } from './iconConfigs/fileIcons.ts';
import { languageIcons } from './iconConfigs/languageIcons.ts';
import { copyDirSyncRec, writeFileSyncRec } from './utils/fs.ts';

type StringRecord = Record<string, string>;

interface FolderTheme {
  folderNames: StringRecord;
  folderNamesExpanded: StringRecord;
}

interface FileTheme {
  fileExtensions: StringRecord;
  fileNames: StringRecord;
}

type IconDefinitions = Record<string, { iconPath: string }>;

rmSync(new URL('../dist', import.meta.url), { force: true, recursive: true });

const iconList = readdirSync(new URL('./icons', import.meta.url), {
  encoding: 'utf8',
});

const iconDefinitions = iconList.reduce<IconDefinitions>((acc, iconName) => {
  const iconInfo = path.parse(iconName);

  if (iconInfo.ext === '.svg') {
    acc[iconInfo.name] = { iconPath: `./icons/${iconInfo.base}` };
  }

  return acc;
}, {});

const iconTheme = {
  hidesExplorerArrows: true,
  iconDefinitions,
  ...commonIcons,
  ...folderIcons.reduce<FolderTheme>(
    (acc, { icon, folders }) => {
      for (const folder of folders) {
        acc.folderNames[folder] = icon;
        acc.folderNamesExpanded[folder] = `${icon}-open`;
      }

      return acc;
    },
    { folderNames: {}, folderNamesExpanded: {} },
  ),
  ...fileIcons.reduce<FileTheme>(
    (acc, { icon, fileExtensions, fileNames }) => {
      for (const fileExtension of fileExtensions ?? []) {
        acc.fileExtensions[fileExtension] = icon;
      }

      for (const fileName of fileNames ?? []) {
        acc.fileNames[fileName] = icon;
      }

      return acc;
    },
    {
      fileExtensions: {},
      fileNames: {},
    },
  ),
  languageIds: languageIcons.reduce<StringRecord>((acc, { icon, ids }) => {
    for (const id of ids) {
      acc[id] = icon;
    }

    return acc;
  }, {}),
};

writeFileSyncRec(
  new URL('../dist/dark/index.json', import.meta.url),
  JSON.stringify(iconTheme),
);

copyDirSyncRec(
  new URL('./icons', import.meta.url),
  new URL('../dist/dark/icons', import.meta.url),
);
