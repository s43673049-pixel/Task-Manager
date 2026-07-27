import { useState } from "react";
import TaskInput from "./components/taskInput";
import TaskStats from "./components/taskStats";
import TaskItem from "./components/taskItem";
import { ListTodo } from "lucide-react";
import "./App.css";

const initialTask = [];

function App() {
  const [tasks, setTasks] = useState(initialTask);
  const [filter, setFilter] = useState("all");

  const addTask = (todoText, todoDate) => {
    setTasks((currentTask) => [
      ...currentTask,
      { id: `${todoText}-${Date.now()}`, todoText, todoDate, completed: false },
    ]);
    setFilter("all");
  };

  const toggleTask = (taskId) => {
    setTasks((currentTask) =>
      currentTask.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.filter((task) => !task.completed).length;

  const deleteTask = (taskId) => {
    setTasks((currentTask) => currentTask.filter((item) => item.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ListTodo className="size-10 text-blue-600" />
            <h1 className="text-4xl text-gray-800">Task Manager</h1>
          </div>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        <div className="mb-6">
          <TaskStats
            total={tasks.length}
            active={activeCount}
            completed={completedCount}
          />
        </div>

        <div className="mb-6">
          <TaskInput addTask={addTask} />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {filter === "all" && "No tasks yet. Add one to get started!"}
              {filter === "active" && "No active tasks. Great job!"}
              {filter === "completed" && "No completed tasks yet."}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
