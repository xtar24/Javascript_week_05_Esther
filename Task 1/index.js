class NotesManager {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    this.notesContainer = document.getElementById("notesContainer");
    this.renderNotes();
  }

  // Add a new note
  addNote(noteText) {
    if (!noteText.trim()) {
      alert("Note cannot be empty!");
      return;
    }
    const note = { id: Date.now(), text: noteText };
    this.notes.push(note);
    this.saveNotes();
    this.renderNotes();
  }

  // Delete a note
  deleteNote(noteId) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    this.saveNotes();
    this.renderNotes();
  }

  // Save notes to local storage
  saveNotes() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  // Render all notes on the page
  renderNotes() {
    this.notesContainer.innerHTML = ""; // Clear container
    this.notes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.className = "note";
      noteElement.innerHTML = `
        <span>${note.text}</span>
        <button onclick="notesManager.deleteNote(${note.id})">Delete</button>
      `;
      this.notesContainer.appendChild(noteElement);
    });
  }
}

// Initialize NotesManager
const notesManager = new NotesManager();

// Add event listener to the "Add Note" button
document.getElementById("addNoteBtn").addEventListener("click", () => {
  const noteInput = document.getElementById("noteInput");
  notesManager.addNote(noteInput.value);
  noteInput.value = ""; // Clear the input field
});
