import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utlis/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // localStorage.clear()
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLocalStorage();
    // console.log(admin,employees)
    const { employees, admin } = getLocalStorage()
    setUserData({ employees, admin });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={[userData, setUserData]}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
