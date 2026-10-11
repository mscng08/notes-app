import { useCallback, useEffect, useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";
import {
  createNote,
  deleteNote,
  errorMessage,
  getNotes,
  updateNote,
} from "./api/notesApi.js";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [toast, setToast] = useState(null); // { type: "success" | "error", text }

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const loadNotes = useCallback(async (query) => {
    setLoading(true);
    try {
      setNotes(await getNotes(query));
    } catch (err) {
      showToast("error", errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search: wait 300ms after the user stops typing
  useEffect(() => {
    const t = setTimeout(() => loadNotes(search), 300);
    return () => clearTimeout(t);
  }, [search, loadNotes]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (editingNote) {
        await updateNote(editingNote.id, data);
        setEditingNote(null);
        showToast("success", "Note updated");
      } else {
        await createNote(data);
        showToast("success", "Note added");
      }
      await loadNotes(search);
    } catch (err) {
      showToast("error", errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (note) => {
    if (!window.confirm(`Delete "${note.title}"? This cannot be undone.`)) return;
    try {
      await deleteNote(note.id);
      if (editingNote?.id === note.id) setEditingNote(null);
      showToast("success", "Note deleted");
      await loadNotes(search);
    } catch (err) {
      showToast("error", errorMessage(err));
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Notes App</h1>
          <p className="subtitle">Write, view, edit and delete your notes in one place.</p>
        </div>
        <span className="count">{notes.length} {notes.length === 1 ? "note" : "notes"}</span>
      </header>

      <main className="layout">
        <aside>
          <NoteForm
            editingNote={editingNote}
            onSubmit={handleSubmit}
            onCancel={() => setEditingNote(null)}
            saving={saving}
          />
        </aside>

        <section>
          <input
            type="search"
            className="search"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search notes"
          />
          <NoteList
            notes={notes}
            loading={loading}
            search={search}
            editingId={editingNote?.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {toast && <div className={`toast ${toast.type}`} role="status">{toast.text}</div>}
    </div>
  );
}
