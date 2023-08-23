import "./style.css";
import { NOTES } from "./data";
import { setupNote } from "../setupNote";
import { $el, generateUUID, getNoteFromDataIndex } from "../utils";

export function setupNotes<T extends HTMLElement = HTMLElement>(element: T) {
  let notes = NOTES;
  let currentNote: Note | null = null;

  element.innerHTML = `<div class="notes--outer">
    <div class="toolbar--outer">
      <button id="createButton">Create New</button>
      <button id="addButton">Add Note</button> 
      <button id="editButton">Edit Note</button>
      <button id="saveButton">Save Edit</button>
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
  const createButton = $el<HTMLButtonElement>("#createButton");
  const editButton = $el<HTMLButtonElement>("#editButton");
  const saveButton = $el<HTMLButtonElement>("#saveButton");
  const addButton = $el<HTMLButtonElement>("#addButton");
  const noteList = $el<HTMLUListElement>("#noteList");

  noteList?.addEventListener("click", noteListClick);

  addButton?.addEventListener("click", addNote);

  createButton?.addEventListener("click", createNote);

  editButton?.addEventListener("click", () => {
    if (currentNote !== null) {
      noteInput!.value = currentNote!.text;
      createButton!.disabled = true;
      addButton!.disabled = true;
      saveButton!.disabled = false;
      renderNotes();
    }
  });

  saveButton?.addEventListener("click", () => {
    if (currentNote) {
      notes = [
        { ...currentNote, text: noteInput!.value.trim() },
        ...notes.filter(($note) => $note.id !== currentNote?.id),
      ];
    }
    createButton!.disabled = false;
    addButton!.disabled = false;
    noteInput!.value = "";
    renderNotes();
  });

  function createNote() {
    // Only create a new note if there is no currentNote
    currentNote = {
      id: generateUUID(),
      text: "",
      time_stamp: new Date().toUTCString(),
    };
    noteInput!.value = currentNote!.text;
    renderNotes();
  }

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
      noteInput!.value = currentNote!.text;
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

  function addNote() {
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

      noteList!.appendChild(
        setupNote({
          element: $li,
          note,
          currentNote: currentNote!,
          index,
        })
      );
    }
  }

  renderNotes();
}
