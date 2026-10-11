const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function NoteCard({ note, onEdit, onDelete, isActive }) {
  const edited = note.updatedAt !== note.createdAt;

  return (
    <article className={`card note-card ${isActive ? "active" : ""}`}>
      <h3>{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <time dateTime={note.updatedAt}>
          {edited ? "Edited " : ""}
          {formatDate(note.updatedAt)}
        </time>
        <div className="note-actions">
          <button className="btn small" onClick={() => onEdit(note)}>
            Edit
          </button>
          <button className="btn small danger" onClick={() => onDelete(note)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
