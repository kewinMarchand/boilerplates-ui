export function sortTable(button: HTMLButtonElement, { locale }?: SortOptions): void;
export function initTables(root?: Document | HTMLElement, options?: SortOptions): () => void;
export type SortOptions = {
    locale?: string;
};
