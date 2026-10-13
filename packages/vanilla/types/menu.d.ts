export function openMenu(menu: Element, focus?: "first" | "last"): void;
export function closeMenu(menu: Element, restoreFocus?: boolean): void;
export function initMenus(root?: Document | HTMLElement): () => void;
