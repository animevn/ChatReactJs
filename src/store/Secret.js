import React, {useContext, useEffect, useState} from "react";
import Message from "../Message";
import firebase from "../firebase/Firebase";
import {AuthContext} from "../firebase/Auth";
import {FirestoreContext} from "../firebase/Firestore";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const Secret = ()=>{
  const {currentUser} = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {messages, setMessages} = useContext(FirestoreContext);

  useEffect(()=>{
    const obj = document.getElementById("scroll");
    obj.scrollTop = obj.scrollHeight;
  });

  const handleSend = event=>{
    event.preventDefault();
    const body = event.target.value;
    setMessage(body);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      onSendClick(event);
    }
  };

  const onSendClick = (event)=>{
    event.preventDefault();
    if (message.length > 0){
      const time = (new Date()).getTime();
      const temp = [...messages, {sender: currentUser.uid, body:message, date:time}];
      const stringTemp = JSON.stringify(temp);
      const db = firebase.firestore().collection("messages").doc(currentUser.uid);
      db.set({string:stringTemp}).then(()=>console.log("success")).catch(err=>console.log(err));
      setMessage("");
    }
  };

  return (
    <Grid>

      <Box display="flex" flexDirection="column" height="50vh" id="scroll"
           style={{overflow:"auto"}}
      >
        {messages.map((item, index)=>{
          return <Message key={index} sender={item.sender} body={item.body}/>
        })}
      </Box>

      <Box component="form" className="container fixed-bottom mb-5"
            onSubmit={onSendClick}
            onKeyDown={handleKeyDown}>
        <div className="input-group input-group-lg col-xl-7 col-lg-8
          col-md-9 col-sm-11 col-11 mb-3 mx-auto">
          <input type="text" className="form-control border-success" placeholder="Your message"
                 aria-label="chat" name="message" onChange={handleSend} value={message}

          />
          <div className="input-group-append">
            <button className="btn btn-outline-success" type="submit">
              Send
            </button>
          </div>
        </div>

        <div className="col-xl-7 col-lg-8 col-md-9 col-sm-11 col-11 mx-auto">
          <button className="btn btn-outline-success btn-lg btn-block"
            onClick={()=>{
              firebase.auth().signOut().then();
              setMessages([]);
            }}>
            Logout
          </button>
        </div>
      </Box>

    </Grid>
  );
};

export default Secret;