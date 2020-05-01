import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./Auth";

export const FirestoreContext = createContext(null);

export const FirestoreProvider = ({children})=>{
  const {currentUser, db} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [database, setDatabase] = useState();

  useEffect(()=>{
    async function loadMessage(){
      if (db){
        db.onSnapshot(async doc => {
          if (doc.exists){
            await setDatabase(doc.data().string);
          }
        }, error => console.log(error));
      }
    }
    loadMessage().then()
  }, [db]);

  useEffect(()=>{
    async function populateMessages(){
      if (currentUser){
        const temp = await JSON.parse(database);
        const tempList = [];
        await temp.forEach(item=>tempList.push(item));
        await setMessages(temp);
      }
    }
    populateMessages().then()

    // eslint-disable-next-line
  }, [database]);

  return (
    <FirestoreContext.Provider value ={{messages, setMessages}}>
      {children}
    </FirestoreContext.Provider>
  );
};