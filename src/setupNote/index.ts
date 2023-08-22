import "./style.css";

interface NoteSetup {
  element: HTMLLIElement;
  note: Note;
  currentNote: Note;
  index: number;
}

export function setupNote({
  element,
  note,
  currentNote,
  index,
}: NoteSetup): HTMLLIElement {
  element.innerHTML = `
    <div class="note ${
      note.id === currentNote?.id ? "current-note" : ""
    }" data-index="${index}">
      <span>${note.text}</span>
    <button class="deleteNote" data-index="${index}">X</button>
    </div>
  `;
  return element;
}
