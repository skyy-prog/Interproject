import React, { useContext, useState, useEffect } from "react";
import { LogOut, Plus, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Usercreatecontext } from "../Context/usercontext";
import axios from "axios";

const DashboardUI = () => {
  const navigate = useNavigate();
  const { token, setoken, saveuserInfo, backendurl } =
    useContext(Usercreatecontext);

  const [open, setOpen] = useState(false);
  const [tasks, setaks] = useState("");
  const [listofarrays, setlistofarrays] = useState([]);
  const [firtsletter, setfirtsletter] = useState("");
  
  const handletologout = () => {
    if (window.confirm("Do you really want to log out?")) {
      localStorage.removeItem("token");
      setoken(null);
      navigate("/");
    }
  };

  const completedCount = listofarrays.filter(
    (task) => task.completed
  ).length;
  const uncompleted = listofarrays.filter((task)=>!task.completed );

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
 
    fetchTasks();
    if (saveuserInfo?.username) {
      setfirtsletter(saveuserInfo.username[0].toUpperCase());
    }
  }, [token, saveuserInfo]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/api/tasks/list`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setlistofarrays(res.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handletoaddthetask = async (e) => {
    e.preventDefault();
    
    if (!tasks.trim()) return;

    try {
      const res = await axios.post(
        `${backendurl}/api/tasks/add`,
        { title: tasks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setlistofarrays((prev) => [...prev, res.data.task]);
        setaks("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(
        `${backendurl}/api/tasks/update/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setlistofarrays((prev) =>
          prev.map((t) => (t._id === id ? res.data.task : t))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handletodeletethetask = async (id) => {
    const originalTasks = listofarrays;
    setlistofarrays((prev) => prev.filter((item) => item._id !== id));
    
    try {
      await axios.post(
        `${backendurl}/api/tasks/delete`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      setlistofarrays(originalTasks);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex relative">
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-xl
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b flex justify-between items-center">
          My<span className="text-gray-500">Dashboard</span>
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg" 
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <button className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            Dashboard   
          </button>
        </nav>

        <div onClick={handletologout} className="p-4 border-t cursor-pointer hover:bg-gray-50 transition-colors">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6 lg:p-8 relative z-10 overflow-x-hidden">
        <div className="flex justify-between items-center mb-6 md:mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => setOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, {saveuserInfo?.username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:block text-right">
              <p className="font-medium text-gray-800 truncate max-w-[180px]">
                {saveuserInfo?.username}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[180px]">
                {saveuserInfo?.email}
              </p>
            </div>

            <div className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-600 text-white font-bold shadow-md">
              {firtsletter}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              {listofarrays.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500">Task Completed</p>
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              {completedCount}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-500">Task Pending</p>
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              {uncompleted.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 md:p-6">
          <form onSubmit={handletoaddthetask} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                value={tasks}
                onChange={(e) => setaks(e.target.value)}
                placeholder="Add a new task..."
                required
                className="pl-11 pr-4 py-3 w-full border rounded-xl focus:ring-2 focus:ring-gray-800 focus:outline-none"
              />
            </div>

            <button className="bg-gray-900 hover:bg-gray-800 transition text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow">
              <Plus size={18} /> Add
            </button>
          </form>

          <div className="space-y-3">
            {listofarrays.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item._id, item.completed)}
                    className="h-5 w-5 accent-gray-800 cursor-pointer"
                  />

                  <p
                    className={`text-base ${
                      item.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800 font-medium"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      item.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.completed ? "Completed" : "Pending"}
                  </span>

                  <button
                    onClick={() => handletodeletethetask(item._id)}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 transition text-white px-4 py-1.5 rounded-lg text-sm font-medium ml-auto sm:ml-0"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {listofarrays.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No tasks yet. Add your first task above!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardUI;