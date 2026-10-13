export function setToastIconSprite(url: string): void;
export function showToast(toaster: HTMLElement, { message, variant }: {
    message: string;
    variant?: ToastVariant;
}): HTMLDivElement;
export function initToasts(root?: Document | HTMLElement): () => void;
export type ToastVariant = "info" | "success" | "warning" | "error";
