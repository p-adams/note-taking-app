import { NOTES } from "./data";
import { setupNote } from "./setupNote";
import { $el, generateUUID, getNoteFromDataIndex } from "./utils";

export function setupNotes<T extends HTMLElement = HTMLElement>(element: T) {
  let notes = NOTES;
  let currentNote: Note | null = null;

  element.innerHTML = `<div class="notes--outer">
    <div class="toolbar--outer">
      <button id="editButton">Edit</button>
      <button id="newButton">New</button>
      <button id="saveButton">Save</button>
    </div>
    <div class="notes--inner">
      <aside>
        <ul id="noteList"></ul>
      </aside>
      <div class="main">
        <textarea id="noteInput"></textarea>
      </div>
    </div>
   </div>`;

  const noteInput = $el<HTMLInputElement>("#noteInput");
  const saveButton = $el("#saveButton");
  const noteList = $el("#noteList");

  noteList?.addEventListener("click", noteListClick);

  saveButton?.addEventListener("click", saveNote);

  function noteListClick(e: Event) {
    const target = e.target as HTMLUListElement;
    if (target.classList.contains("deleteNote")) {
      deleteNote(target);
      return;
    }
    const noteElement = target.closest(".note") as HTMLDivElement;
    if (noteElement) {
      const note = getNoteFromDataIndex<HTMLDivElement>(noteElement, notes);
      currentNote = notes.find(($note) => $note.id === note.id) ?? null;
      renderNotes();
    }
  }

  function deleteNote(target: HTMLUListElement) {
    if (target.classList.contains("deleteNote")) {
      const note = getNoteFromDataIndex<HTMLUListElement>(target, notes);
      notes = notes.filter(($note) => $note.id !== note.id);
      currentNote = notes[0];
      renderNotes();
    }
  }

  function saveNote() {
    const noteText = noteInput!.value.trim();
    if (noteText === "") {
      return;
    }
    const newNote: Note = {
      id: generateUUID(),
      text: noteText,
      time_stamp: new Date().toUTCString(),
    };
    currentNote = newNote;
    notes = [currentNote, ...notes];
    renderNotes();
    noteInput!.value = "";
  }

  function renderNotes() {
    noteList!.innerHTML = "";
    if (!notes.length) {
      const $li = document.createElement("li");
      $li.innerHTML = `<span>No Notes</span>`;
      noteList!.appendChild($li);
    }
    for (const [index, note] of notes.entries()) {
      const $li = document.createElement("li");
      const noteListItem = setupNote({
        element: $li,
        note,
        currentNote: currentNote!,
        index,
      });
      noteList!.appendChild(noteListItem);
    }
  }

  renderNotes();
}
