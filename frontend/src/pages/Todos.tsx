import {
  useTodos,
  useToggleTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../hooks/useTodoQuery";
import AddTodoForm from "../components/AddTodoForm";
import TodoItem from "../components/TodoItem";
import type { Todo } from "../schemas/todo.schema";
import Navbar from "../components/Navbar";
import "./Todos.css";

export default function Todos() {
  const { data } = useTodos();
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();
  const todoCount = data?.todos?.length || 0;
  const completedCount =
    data?.todos?.filter((t: Todo) => t.completed).length || 0;

  return (
    <div className="todos-container">
      <Navbar />

      <div className="todos-content">
        {/* Header Section */}
        <div className="todos-header">
          <div className="header-top">
            <h1>📝 My Todos</h1>
            <div className="todo-stats">
              <span className="stat-item">
                <span className="stat-label">Total:</span>
                <span className="stat-value">{todoCount}</span>
              </span>
              <span className="stat-item">
                <span className="stat-label">Done:</span>
                <span className="stat-value completed">{completedCount}</span>
              </span>
            </div>
          </div>
          <p className="header-subtitle">Stay organized and productive</p>
        </div>

        {/* Add Todo Form */}
        <div className="add-todo-section">
          <AddTodoForm />
        </div>

        {/* Todos List */}
        <div className="todos-list-container">
          {todoCount === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">✨</span>
              <p>No todos yet! Create one to get started.</p>
            </div>
          ) : (
            <div className="todos-list">
              {data?.todos?.map((todo: Todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={(id: string) => toggleMutation.mutate(id)}
                  onDelete={(id: string) => deleteMutation.mutate(id)}
                  onUpdate={(id, data) => updateMutation.mutate({ id, data })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
