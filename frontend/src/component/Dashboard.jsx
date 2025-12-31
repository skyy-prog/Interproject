import React, { useContext, useState ,useEffect } from "react";
import { User, LogOut, Plus, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  { Usercreatecontext } from "../Context/usercontext";

const DashboardUI = () => {
  const [open, setOpen] = useState(false);
  const {token , setoken} = useContext(Usercreatecontext);
  const [tasks , setaks] = useState('');
const handletologout = () => {
  const decision = window.confirm("Do you really want to log out?");
  if (decision) {
    localStorage.removeItem("token");
    setoken(null);          
    navigate("/");        
  }
};
const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-xl flex flex-col transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold text-gray-800 border-b flex justify-between items-center">
          MyDashboard
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-3 ">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-900 text-white">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
            Tasks
          </button>
        </nav>

        <div  onClick={handletologout} className="p-4 rounded-3xl  cursor-pointer place-items-center border-t">
          <button className="flex  items-center gap-2 text-red-500">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </button>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
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

        {/* Tasks */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Tasks
            </h2>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search tasks"
                  className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <button className="flex items-center justify-center gap-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            
                <div
                  className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <p></p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    Pending
                  </span>
                </div>
              
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardUI;
