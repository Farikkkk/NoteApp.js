const btn = document.querySelector(".btn");
const appEL = document.querySelector(".container");

btn.addEventListener("click", () => {
  addNote();
});

getNotes().forEach((note) => {
  const element = createNoteEl(note.id, note.content);
  appEL.insertBefore(element, btn);
});

function createNoteEl(id, content) {
  const noteEl = document.createElement("textarea");
  noteEl.classList.add("note");
  noteEl.placeholder = "Empty note";
  noteEl.value = content;

  noteEl.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note ?");
    if (warning) {
      deleteNote(id, noteEl);
    }
  });

  noteEl.addEventListener("input", () => {
    updateNote(id, noteEl.value);
  });

  return noteEl;
}

function deleteNote(id, noteEl) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNoteLocalStorage(notes);
  appEL.removeChild(noteEl);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id === id)[0];
  target.content = content;
  saveNoteLocalStorage(notes);
}

function addNote() {
  const notes = getNotes();

  const noteObj = {
    id: Math.floor(Math.random() * 1000000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEL.insertBefore(noteEl, btn);
  notes.push(noteObj);

  saveNoteLocalStorage(notes);
}

function saveNoteLocalStorage(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}
