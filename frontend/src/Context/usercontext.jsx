import { createContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
export const Usercreatecontext = createContext();

const UserContext = ({ children }) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [token, setoken] = useState(localStorage.getItem("token"));
  const [saveuserInfo, setsaveuserInfo] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setloading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${backendurl}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setsaveuserInfo(res.data.user);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      setoken(null);
    } finally {
      setloading(false);
    }
  };

  return (
    <Usercreatecontext.Provider
      value={{ backendurl, token, setoken, saveuserInfo, loading }}
    >
      {children}
    </Usercreatecontext.Provider>
  );
};

export default UserContext;
