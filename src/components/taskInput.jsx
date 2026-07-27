import { useRef } from "react";
import { Plus } from "lucide-react";

const TaskInput = ({ addTask }) => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const todoText = todoTextInput.current.value.trim();
    const todoDate = todoDateInput.current.value;

    if (!todoText) return;

    addTask(todoText, todoDate);
    todoTextInput.current.value = "";
    todoDateInput.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        ref={todoTextInput}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="date"
        ref={todoDateInput}
        className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Plus className="size-5" />
        Add
      </button>
    </form>
  );
};

export default TaskInput;