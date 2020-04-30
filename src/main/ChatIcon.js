import React, {useContext, useEffect, useState} from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';
import SendIcon from '@material-ui/icons/Send';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import {AuthContext} from "../firebase/Auth";
import {FirestoreContext} from "../firebase/Firestore";
import firebase from "../firebase/Firebase";
import Message from "../Message";

export default function ChatIcon(){

  const {currentUser} = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {messages} = useContext(FirestoreContext);

  const [toggle, setToggle] = useState(false);
  const [chatHeight, setChatHeight] = useState("50vh");

  useEffect(()=>{
    const obj = document.getElementById("scroll");
    obj.scrollTop = obj.scrollHeight;
  });

  const onToggleChat = () => {
    setToggle(!toggle);
  };

  const titleStyle = {
    root:{
      fontSize: "5rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  };

  const fabStyle = {
    root: {
      position: 'fixed',
      bottom: "2rem",
      left: "2rem",
    },
  };

  const tabStyle = {
    root: {
      position: 'fixed',
      bottom: "1rem",
      width:"90vw",
      height: chatHeight,
      margin: "0 auto 0 auto",
      zIndex: "10",
      backgroundColor: "#fff0f5ee",
      borderRadius: "0.5rem",
      overflow: "hidden",
      WebkitOverflowScrolling: "touch",

    },
  }

  const tabBoxTopStyle = {
    root:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "stretch",
      width: "100%",
      backgroundColor: "lavender",
    }
  };

  const tabBoxBottomStyle = {
    root:{
      position: "absolute",
      bottom: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: "lavender",
      padding: "3px 0 3px 3px",

    }
  };

  const messageStyle = {
    root:{
      marginRight: "auto",
      flexGrow: 1,
      backgroundColor: "white",
      overflow: "hidden",
    }
  };

  const buttonSendStyle = {
    root:{
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    }
  }

  const handleSend = event=>{
    event.preventDefault();
    const body = event.currentTarget.value;
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

  const chatBoxStyle = {
    root:{
      display: "flex",
      flexDirection: "column",
      height:"75%",
      WebkitOverflowScrolling: "touch",
      WebkitBoxFlex: 0,
      overflowY: "scroll",

    }
  }


  return (
    <>
      <Zoom in={toggle} timeout={600}>
        <div onClick={onToggleChat} role="presentation" style={fabStyle.root}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <PermPhoneMsgIcon/>
          </Fab>
        </div>
      </Zoom>

      <Slide direction="up" in={!toggle} timeout={600} mountOnEnter unmountOnExit>

        <Box role="presentation" style={tabStyle.root} boxShadow={3}>
          <Box style={tabBoxTopStyle.root}>
            <Box>
              <IconButton onClick={onToggleChat} size="small" >
                <CancelRoundedIcon color="secondary"/>
              </IconButton>
            </Box>
          </Box>

          <Box style={chatBoxStyle.root} id="scroll">
            {messages.map((item, index)=>{
              return (
                <Box>
                  <Message key={index} sender={item.sender} body={item.body}/>
                </Box>
              )
            })}
          </Box>

          <Box component="form"
               onSubmit={onSendClick}
               style={tabBoxBottomStyle.root}
          >
            <TextField variant="outlined" multiline={true} style={messageStyle.root}
                       name="body" value={message} onChange={handleSend} required
                       onKeyDown={handleKeyDown}
            />

            <IconButton style={buttonSendStyle.root} type="submit">
              <SendIcon color="secondary"/>
            </IconButton>

          </Box>

        </Box>

      </Slide>
    </>

  )
};

