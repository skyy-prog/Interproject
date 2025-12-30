import { createContext } from "react";
const backendurl = import.meta.env.VITE_BACKEND_URL;
import React from "react";
 export const Usercreatecontext = createContext();
const UserContext = (props)=>{
    const value = {
        backendurl,
    }
    return(
        <Usercreatecontext.Provider value={value}>
            {props.children}
        </Usercreatecontext.Provider>
    )
}
export default UserContext;