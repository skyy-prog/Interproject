import React, { useContext, useState } from 'react'
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
 import { Usercreatecontext } from '../Context/usercontext';
const Login = () => {
  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [username, setusername] = useState("");
  const [ishow, setishow] = useState(false);
  const [currentstate, setcurrentstate] = useState("Login");
  const [saveuserInfo , setsaveuserInfo] = useState('');
  const {backendurl} = useContext(Usercreatecontext);
  const handletologin = (e) => {
    e.preventDefault();
    console.log("Email:", useremail);
    console.log("Password:", userpassword);
    console.log("Username:", username);
    console.log("Mode:", currentstate);
    console.log(backendurl);
  };

  return (
    <form className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center mb-6">
          {currentstate}
        </h1>

        <div className="space-y-4">

          {currentstate === "Signup" && (
            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
          )}

          <input
            value={useremail}
            onChange={(e) => setuseremail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
          />

          <div className="relative">
            <input
              value={userpassword}
              onChange={(e) => setuserpassword(e.target.value)}
              type={ishow ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setishow(!ishow)}
            >
              {ishow ? <FaRegEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full mt-4 text-sm text-gray-600 cursor-pointer"
          onClick={() =>
            setcurrentstate(currentstate === "Login" ? "Signup" : "Login")
          }
        >
          {currentstate === "Login"
            ? "Create an account?"
            : "Already have an account?"}
        </button>

        <button
          onClick={handletologin}
          className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-900"
        >
          {currentstate === "Login" ? "Login" : "Signup"}
        </button>

      </div>
    </form>
  );
};

export default Login;
