import React, {createContext, useEffect, useState} from "react";
import firebase from "./Firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    async function getCurrentUser() {
      if (!currentUser) firebase.auth().signInAnonymously().then().catch(err=>console.log(err));
      await firebase.auth().onAuthStateChanged(setCurrentUser);
    }
    getCurrentUser().then();
  }, []);

  return (
    <AuthContext.Provider value ={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};