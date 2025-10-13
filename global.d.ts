export {};

declare global {
  interface TreeItem {
    label: string;
    open?: boolean;
    path?: string;
    children?: TreeItem[];
  }
}
