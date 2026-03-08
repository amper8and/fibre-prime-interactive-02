export const BASE_PATH = '/fibre-prime-interactive-02';

export function assetPath(path: string) {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}
