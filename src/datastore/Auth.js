import React, {createContext, useEffect, useState} from "react";
import firebase from "./Firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{

  const [currentUser, setCurrentUser] = useState(null);
  const [db, setDb] = useState(null);

  const saveStyle = localStorage.getItem("saveStyle");
  const [styleStore, setStyleStore] = useState(saveStyle? JSON.parse(saveStyle) : null);

  useEffect(()=>{
    async function setStyleDB() {
      const dbStyle = firebase.firestore().collection("styles").doc("style1");
      dbStyle.onSnapshot(async doc => {
        if (doc.exists){
          const temp = await JSON.parse(doc.data().style);
          await setStyleStore(temp);
        }
      }, error => console.log(error));
    }
    setStyleDB().then();
  }, []);

  useEffect(()=>{
    localStorage.setItem("saveStyle", JSON.stringify(styleStore));
  }, [styleStore]);

  useEffect(()=>{
    async function getCurrentUser() {
      if (!currentUser) firebase.auth().signInAnonymously().then().catch(err=>console.log(err));
      await firebase.auth().onAuthStateChanged(setCurrentUser);
    }
    getCurrentUser().then();
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    async function setChatDatabase() {
      if (currentUser){
        const db = firebase.firestore().collection("messages").doc(currentUser.uid);
        await setDb(db);
      }
    }
    setChatDatabase().then();
  }, [currentUser]);




  return (
    <AuthContext.Provider value ={{currentUser, setCurrentUser, db, styleStore}}>
      {children}
    </AuthContext.Provider>
  );
};