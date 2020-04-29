import React, {createContext, useEffect, useState} from "react";
import app from "./Firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    async function getCurrentUser() {
      await app.auth().onAuthStateChanged(setCurrentUser);
    }
    getCurrentUser().then();
  }, []);

  return (
    <AuthContext.Provider value ={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};