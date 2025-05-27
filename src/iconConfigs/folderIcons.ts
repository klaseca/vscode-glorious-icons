interface FolderIconsConfig {
  icon: string;
  folders: Array<string>;
}

export const folderIcons: Array<FolderIconsConfig> = [
  { icon: 'folder-nginx', folders: ['nginx'] },
  { icon: 'folder-ci', folders: ['ci'] },
  { icon: 'folder-test', folders: ['test', 'tests', '__test__', '__tests__'] },
  { icon: 'folder-node', folders: ['node_modules'] },
  { icon: 'folder-assets', folders: ['assets', 'static', 'public'] },
  { icon: 'folder-js', folders: ['js'] },
  { icon: 'folder-css', folders: ['css'] },
  { icon: 'folder-sass', folders: ['sass', 'scss'] },
  { icon: 'folder-src', folders: ['src', 'source'] },
  { icon: 'folder-images', folders: ['images'] },
  { icon: 'folder-git', folders: ['.git'] },
  { icon: 'folder-github', folders: ['.github'] },
  { icon: 'folder-vscode', folders: ['.vscode'] },
  { icon: 'folder-gulp', folders: ['.gulp', 'gulp'] },
  { icon: 'folder-dist', folders: ['build', 'dist', 'out'] },
  { icon: 'folder-grpc', folders: ['grpc'] },
];
