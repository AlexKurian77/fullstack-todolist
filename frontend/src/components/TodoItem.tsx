import { useState } from "react";
import type { Todo } from "../schemas/todo.schema";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { title: string; description?: string }) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description || "",
  });

  const handleSave = () => {
    if (!editForm.title.trim()) {
      alert("Title can't be empty");
      return;
    }

    onUpdate(todo._id, editForm);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {editing ? (
        <div className="todo-edit-form">
          <div className="edit-header">
            <h3 className="edit-title">✏️ Edit Todo</h3>
          </div>

          {/* Edit Title Input */}
          <div className="form-group">
            <label htmlFor={`edit-title-${todo._id}`}>Title</label>
            <div
              className={`input-wrapper ${focusedField === "title" ? "focused" : ""}`}
            >
              <span className="input-icon">📌</span>
              <input
                id={`edit-title-${todo._id}`}
                className="edit-input"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                onFocus={() => setFocusedField("title")}
                onBlur={() => setFocusedField(null)}
                placeholder="Edit title"
              />
            </div>
          </div>

          {/* Edit Description Input */}
          <div className="form-group">
            <label htmlFor={`edit-description-${todo._id}`}>Description</label>
            <div
              className={`textarea-wrapper ${focusedField === "description" ? "focused" : ""}`}
            >
              <span className="input-icon">📝</span>
              <textarea
                id={`edit-description-${todo._id}`}
                className="edit-textarea"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                onFocus={() => setFocusedField("description")}
                onBlur={() => setFocusedField(null)}
                placeholder="Edit description (optional)"
                rows={3}
              />
            </div>
          </div>

          {/* Edit Actions */}
          <div className="edit-actions">
            <button className="action-button save-button" onClick={handleSave}>
              <span>💾</span>
              Save Changes
            </button>

            <button
              className="action-button cancel-button"
              onClick={() => setEditing(false)}
            >
              <span>✕</span>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <div className="todo-header">
              <h3 className="todo-title">
                {todo.completed ? <s>{todo.title}</s> : todo.title}
              </h3>
              {todo.completed && <span className="completed-badge">✓ Done</span>}
            </div>

            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
          </div>

          <div className="todo-actions">
            <button
              onClick={() => setEditing(true)}
              className="action-button edit-button"
              title="Edit todo"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => onToggle(todo._id)}
              className={`action-button toggle-button ${
                todo.completed ? "undo" : "complete"
              }`}
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed ? "↩️ Undo" : "✓ Done"}
            </button>

            <button
              onClick={() => onDelete(todo._id)}
              className="action-button delete-button"
              title="Delete todo"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
