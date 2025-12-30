import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const [useremail , setuseremil] = useState("");
    const [ishow , setishow] =useState(false);
    const [userpassword , setuserpassword] = useState("");
const handletologin =(e)=>{
console.log(useremail)
console.log(userpassword);
e.preventDefault();

}
  return (
    <>
 <form   className="min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm h-[50vh]">
    
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Login
    </h1>

    <div className="space-y-4">
      <input
      value={useremail}
      onChange={(e)=>setuseremil(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
      value={userpassword}
      onChange={(e)=>setuserpassword(e.target.value)}
        type= { ishow ? 'password' : 'text'}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />
      <div className=' flex justify-center items-center'>
        {ishow ? <FaEye className=' cursor-pointer' size={20} onClick={()=> setishow(!ishow)} />:<FaRegEyeSlash className=' cursor-pointer' size={20}  onClick={()=> setishow(!ishow)} />}
      </div>
    </div>

    <button
      className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
      onClick={handletologin}
    >
      Login
    </button>

  </div>
</form>

    </>
  )
}

export default Login