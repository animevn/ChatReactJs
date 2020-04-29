import React, {createContext, useContext, useEffect, useState} from "react";
import firebase from "./Firebase"
import {AuthContext} from "./Auth";

export const FirestoreContext = createContext(null);

export const FirestoreProvider = ({children})=>{
  const {currentUser} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    async function loadMessage(){
      if (currentUser){
        const db = firebase.firestore().collection("messages").orderBy("date");
        await db.onSnapshot(snapshot => {
          let changes = snapshot.docChanges();
          for (let change of changes){
            if (change.type === "added"){
              setMessages(olds=>[...olds, change.doc.data()])
            }
          }
        })
      }
    }
    loadMessage().then()
  }, [currentUser]);

  // useEffect(()=>{
  //   async function loadMessage(){
  //     if (currentUser){
  //       const db = firebase.firestore().collection("messages").orderBy("date");
  //       await db.onSnapshot(snapshot => {
  //         let changes = snapshot.docChanges();
  //         for (let change of changes){
  //           if (change.type === "added"){
  //             setMessages(olds=>[...olds, change.doc.data()])
  //           }
  //         }
  //       })
  //     }
  //   }
  //   loadMessage().then()
  // }, [currentUser]);

  return (
    <FirestoreContext.Provider value ={{messages}}>
      {children}
    </FirestoreContext.Provider>
  );
};