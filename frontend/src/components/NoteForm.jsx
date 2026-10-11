import { useEffect, useState } from "react";

const MAX_TITLE = 150;

export default function NoteForm({ editingNote, onSubmit, onCancel, saving }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [touched, setTouched] = useState(false);

  // Fill the form when a note is selected for editing
  useEffect(() => {
    setTitle(editingNote?.title ?? "");
    setContent(editingNote?.content ?? "");
    setTouched(false);
  }, [editingNote]);

  const titleError = touched && !title.trim() ? "Title is required" : "";
  const contentError = touched && !content.trim() ? "Content is required" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content });
    if (!editingNote) {
      setTitle("");
      setContent("");
      setTouched(false);
    }
  };

  return (
    <form className="card note-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingNote ? "Edit note" : "New note"}</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Give your note a title"
        value={title}
        maxLength={MAX_TITLE}
        onChange={(e) => setTitle(e.target.value)}
        className={titleError ? "invalid" : ""}
      />
      {titleError && <span className="field-error">{titleError}</span>}

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        rows={7}
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={contentError ? "invalid" : ""}
      />
      {contentError && <span className="field-error">{contentError}</span>}

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving..." : editingNote ? "Update note" : "Add note"}
        </button>
        {editingNote && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
