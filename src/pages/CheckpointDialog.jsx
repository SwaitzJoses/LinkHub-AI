import "./CheckpointDialog.css";

export default function CheckpointDialog({
  open,
  title,
  notes,
  setTitle,
  setNotes,
  onSave,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="checkpoint-overlay">
      <div className="checkpoint-dialog">
        <h2>Checkpoint</h2>

        <input
          type="text"
          placeholder="Checkpoint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
        />

        <div className="checkpoint-buttons">
          <button
            className="save-btn"
            disabled={!title.trim()}
            onClick={onSave}
          >
            Save Checkpoint
          </button>

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}