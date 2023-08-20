export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function $el<T extends HTMLElement = HTMLElement>(
  selector: string
): T | null {
  return document.querySelector<T>(selector)!;
}

export function getNoteFromDataIndex<T extends HTMLElement = HTMLElement>(
  target: T,
  notes: Note[]
) {
  const $index = parseInt(target.getAttribute("data-index")!);
  return notes[$index];
}
