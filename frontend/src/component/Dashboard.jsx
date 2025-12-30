import React from "react";
import { User, LogOut, Plus, Search } from "lucide-react";

const DashboardUI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-gray-800 border-b">
          MyDashboard
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-900 text-white">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
            Tasks
          </button>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-2 text-red-500">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                Anant Prajapati
              </p>
              <p className="text-xs text-gray-500">
                anant@email.com
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {["Total Tasks", "Completed", "Pending"].map((title, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {i === 0 ? 24 : i === 1 ? 15 : 9}
              </p>
            </div>
          ))}
        </div>

        {/* Task Section */}
        <div className="bg-white rounded-xl shadow p-6">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Tasks
            </h2>

            <div className="flex gap-2">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search tasks"
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <button className="flex items-center gap-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {["Design dashboard UI", "Integrate API", "Fix bugs"].map(
              (task, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <p className="text-gray-800">{task}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    Pending
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardUI;
