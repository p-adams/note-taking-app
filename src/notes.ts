import { NOTES } from "./data";
import { $el, generateUUID } from "./utils";

export function setupNotes<T extends HTMLElement = HTMLElement>(element: T) {
  element.innerHTML = `<div>
    <input id="noteInput"/>
    <button id="addButton">add</button>
    <ul id="noteList"></ul>
   </div>`;

  const noteInput = $el<HTMLInputElement>("#noteInput");
  const addButton = $el("#addButton");
  const noteList = $el("#noteList");

  noteList?.addEventListener("click", deleteNote);

  addButton?.addEventListener("click", addNote);

  function deleteNote(e: Event) {
    const target = e.target as HTMLUListElement;
    if (target.classList.contains("deleteNote")) {
      const $index = parseInt(target.getAttribute("data-index")!);
      NOTES.splice($index, 1);
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
    NOTES.push(newNote);
    renderNotes();
    noteInput!.value = "";
  }

  function renderNotes() {
    noteList!.innerHTML = "";
    for (const [index, note] of NOTES.entries()) {
      const $li = document.createElement("li");
      $li.innerHTML = `
            <span>${note.text}</span>
            <button class="deleteNote" data-index="${index}">Delete</button>
        `;
      noteList!.appendChild($li);
    }
  }
}
