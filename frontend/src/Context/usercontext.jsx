import { createContext, useState } from "react";
const backendurl = import.meta.env.VITE_BACKEND_URL;
import React from "react";
 export const Usercreatecontext = createContext();
const UserContext = (props)=>{
    const [token, setoken] = useState(localStorage.getItem("token"))
    const value = {
        backendurl,
        token, setoken
    }
    return(
        <Usercreatecontext.Provider value={value}>
            {props.children}
        </Usercreatecontext.Provider>
    )
}
export default UserContext;