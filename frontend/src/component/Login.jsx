import React, { useState } from 'react'

const Login = () => {
    const [useremail , setuseremil] = useState("");
    const [userpassword , setuserpassword] = useState("");
const handletologin =()=>{

}
  return (
    <>
 <form onClick={handletologin} class="min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm h-[50vh]">
    
    <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">
      Login
    </h1>

    <div class="space-y-4">
      <input
      value={useremail}
      onChange={(e)=>setuseremil(e.target.value)}
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
      value={userpassword}
      onChange={(e)=>setuserpassword(e.target.value)}
        type="password"
        placeholder="Password"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>

    <button
      type="submit"
      class="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
    >
      Login
    </button>

  </div>
</form>

    </>
  )
}

export default Login