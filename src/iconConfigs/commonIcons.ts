type CommonIconsConfig = Record<
  'file' | 'folder' | 'folderExpanded' | 'rootFolder' | 'rootFolderExpanded',
  string
>;

export const commonIcons: CommonIconsConfig = {
  file: 'file',
  folder: 'folder-common',
  folderExpanded: 'folder-common-open',
  rootFolder: 'folder-root',
  rootFolderExpanded: 'folder-root-open',
};
