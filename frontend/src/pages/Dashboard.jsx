import { useState } from "react";
import { CheckCircle, Clock, ListTodo, Plus, Search } from "lucide-react";

import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TodoList from "../components/ToDoList";

const Dashboard = () => {
  const [todos, setTodos] = useState([
      { id: 1, title: "Task 1", date: "2023-01-01", completed: false },
      { id: 2, title: "Task 2", date: "2023-01-02", completed: true },
      { id: 3, title: "Task 3", date: "2023-01-03", completed: false },
  ]);

  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: input,
        date: new Date().toISOString().slice(0, 10),
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (todo) => {
    const updatedTitle = prompt("Edit task: ", todo.title);

    if (updatedTitle?.trim()) {
      setTodos(todos.map((item) =>
          item.id === todo.id ? { ...item, title: updatedTitle} : item
        ));
    }
  };

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-2">
              Manage your tasks and stay productive.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border">
            <Search className="text-slate-400" size={18} />
            <input placeholder="Search tasks..." className="outline-none" />
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Tasks"
            count={todos.length}
            icon={<ListTodo />}
            color="bg-violet-100 text-violet-600"
          />

          <StatsCard
            title="Completed Tasks"
            count={completed}
            icon={<CheckCircle />}
            color="bg-green-100 text-green-600"
          />

          <StatsCard
            title="Pending"
            count={pending}
            icon={<Clock />}
            color="bg-orange-100 text-orange-600"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl mb-8 border">
          <h2 className="font-bold text-lg mb-4">Add New Task</h2>
           <div className="flex gap-3">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              onClick={addTodo}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-xl flex items-center gap-2"
            >
              <Plus size={20} /> Add Task
            </button>
        </div>
    </div>

        <TodoList todos={todos} 
        ontoggle={toggleTodo} 
        ondelete={deleteTodo} 
        onedit={editTodo} />
      </main>
    </div>
  );
};

export default Dashboard;
