import NoteCard from "./NoteCard.jsx";

export default function NoteList({ notes, loading, search, editingId, onEdit, onDelete }) {
  if (loading) return <p className="state-msg">Loading notes...</p>;

  if (notes.length === 0) {
    return (
      <p className="state-msg">
        {search ? `No notes match "${search}".` : "No notes yet. Add your first note!"}
      </p>
    );
  }

  return (
    <div className="note-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          isActive={note.id === editingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
