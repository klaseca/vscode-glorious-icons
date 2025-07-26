import type { Extensions } from '../types.ts';

export const getMultiExtensionsFiles = (
  filename: string,
  extensions: Extensions,
): Array<string> => {
  return extensions.map((ext) => filename + ext);
};
