import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const TaskInput = ({ addTask }) => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const todoText = todoTextInput.current.value.trim();
    const todoDate = todoDateInput.current.value;

    if (!todoText || !todoDate) return;

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: todoText,
          date: todoDate
        })
      });
      const serverItem = await response.json();

      if (!response.ok) {
        throw new Error(serverItem.message || "Unable to save the task.");
      }

      addTask(serverItem);
      todoTextInput.current.value = "";
      todoDateInput.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save the task.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="text"
        ref={todoTextInput}
        placeholder="Add a new task..."
        required
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="date"
        ref={todoDateInput}
        required
        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <button
        type="submit"
        disabled={isSaving}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Plus className="size-5" />
        {isSaving ? "Saving..." : "Add"}
      </button>
      {error && (
        <p className="w-full text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskInput;