import React, { useContext, useState } from 'react'
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
 import { Usercreatecontext } from '../Context/usercontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
  const [email, setuseremail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setusername] = useState("");
  const [ishow, setishow] = useState(false);
  const [currentstate, setcurrentstate] = useState("Login");
  const navigate = useNavigate();
  const {backendurl , setoken , setsaveuserInfo} = useContext(Usercreatecontext);
  const handletologin = async(e) => {
    e.preventDefault();
    console.log(backendurl)
    if(currentstate === 'Login'){
        console.log(email , password)
        try {
            const response = await axios.post(`${backendurl}/api/users/login`, {email , password});
            if (response.data.success) {
  localStorage.setItem("token", response.data.token);
  setoken(response.data.token);   
  navigate('/DashboardUI');
  toast.success('Logged In');
  const id = response.data.user.id;
  const response2 = await axios.post(backendurl+'/api/users/infofuser' , {id});
  if(response2.data.success){
    const user = response2.data.finduser;
setsaveuserInfo(user)
  }else{
    console.log('got some eror');
    console.log(response2)
  }
}
        } catch (error) {
            console.log(error)
        }
    }else if(currentstate === 'Signup'){
        try {
            const response = await axios.post(backendurl + '/api/users/register'  ,{name , email , password})
             if(response.data.success){
                localStorage.setItem("token", response.data.token);
  setoken(response.data.token);    
  navigate('/DashboardUI');
  toast.success('Logged In');
  console.log(response.data.userId)
             }
        } catch (error) {
            console.log(error);
        }
    }
  };

  return (
    <form     onSubmit={handletologin}  className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center mb-6">
          {currentstate}
        </h1>

        <div className="space-y-4">

          {currentstate === "Signup" && (
            <input
              value={name}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              required
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
          )}

          <input
            value={email}
            onChange={(e) => setuseremail(e.target.value)}
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
          />

          <div className="relative">
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
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
        type='submit'
          className="w-full mt-4 cursor-pointer bg-black text-white py-2 rounded-lg hover:bg-gray-900"
        >
          {currentstate === "Login" ? "Login" : "Signup"}
        </button>

      </div>
    </form>
  );
};

export default Login;
