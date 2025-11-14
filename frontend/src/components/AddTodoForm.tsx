import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type TodoInput } from "../schemas/todo.schema";
import { useCreateTodo } from "../hooks/useTodoQuery";
import "./AddTodoForm.css";

export default function AddTodoForm() {
  const createMutation = useCreateTodo();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data: TodoInput) => {
    createMutation.mutate(data);
    reset();
  };

  return (
    <div className="add-todo-form">
      <h3 className="form-title">✨ Add New Todo</h3>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Todo Title</label>

          <div
            className={`input-wrapper ${
              focusedField === "title" ? "focused" : ""
            }`}
          >
            <span className="input-icon">📌</span>

            <input
              id="title"
              type="text"
              placeholder="What needs to be done?"
              {...register("title")}
              onFocus={() => setFocusedField("title")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {errors.title && (
            <p className="error-msg">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>

          <div
            className={`textarea-wrapper ${
              focusedField === "description" ? "focused" : ""
            }`}
          >
            <span className="input-icon">📝</span>

            <textarea
              id="description"
              placeholder="Add more details about this todo..."
              rows={3}
              {...register("description")}
              onFocus={() => setFocusedField("description")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {errors.description && (
            <p className="error-msg">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="add-todo-button"
          disabled={createMutation.isPending || isSubmitting}
        >
          {createMutation.isPending ? (
            <>
              <span className="spinner"></span>
              Creating...
            </>
          ) : (
            <>
              <span>➕</span> Add Todo
            </>
          )}
        </button>
      </form>
    </div>
  );
}
