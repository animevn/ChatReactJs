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
import {AuthContext} from "./datastore/Auth";
import {FirestoreContext} from "./datastore/Firestore";
import firebase from "./datastore/Firebase";
import Message from "./Message";
import {makeStyles} from "@material-ui/core/styles";

export default function ChatClient(){

  const {currentUser} = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {messages} = useContext(FirestoreContext);

  const [toggle, setToggle] = useState(true);

  useEffect(()=>{
    const obj = document.getElementById("scroll");
    if (obj) obj.scrollTop = obj.scrollHeight;
  });

  const onToggleChat = () => {
    setToggle(!toggle);
  };

  const fabStyle = {
    root: {
      position: 'fixed',
      bottom: "2rem",
      left: "2rem",
    },
  };

  const tabStyle = makeStyles(theme=>({
    root: {
      position: 'fixed',
      bottom: 0,
      left: "5rem",
      [theme.breakpoints.down(600)]: {
        left: "auto",
      },
      height: "50vh",
      margin: "0 auto 0 auto",
      zIndex: "10",
      backgroundColor: "#fff0f5ee",
      borderRadius: "0.5rem",
      overflow: "hidden",
      WebkitOverflowScrolling: "touch",

    },
  }));

  const tabBoxTopStyle = {
    root:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "stretch",
      width: "100%",
      padding: "3px",
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
      paddingLeft:"3px",
    }
  };

  const messageStyle = {
    root:{
      flexGrow: 1,
      backgroundColor: "white",
      multiline:true,
    }
  };

  const buttonSendStyle = {
    root:{
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    }
  };

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
      // WebkitOverflowScrolling: "touch",
      overflowY: "scroll",
    }
  };

  // const inputStyle = makeStyles(()=>({
  //   root:{
  //     height:"1rem",
  //     multiline: true,
  //   }
  // }));

  const chatWidth = {xs:"90vw", sm:"400px", md:"400px", lg:"400px", xl:"400px"};

  return (
    <>
      <Zoom in={toggle} timeout={500}>
        <div onClick={onToggleChat} role="presentation" style={fabStyle.root}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <PermPhoneMsgIcon/>
          </Fab>
        </div>
      </Zoom>

      <Slide direction="up" in={!toggle} timeout={600} mountOnEnter unmountOnExit>

        <Box role="presentation"
             className={tabStyle().root}
             boxShadow={3}
             width={chatWidth}
        >

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
                <Box key={index}>
                  <Message sender={item.sender} body={item.body}/>
                </Box>
              )
            })}
          </Box>

          <Box component="form"
               onSubmit={onSendClick}
               style={tabBoxBottomStyle.root}
          >
            <TextField variant="outlined"
                       margin="dense"
                       multiline={true}
                       style={messageStyle.root}
                       name="body"
                       value={message}
                       onChange={handleSend} required
                       onKeyDown={handleKeyDown}
                       // InputProps={{className:inputStyle().root}}
            />

            <IconButton style={buttonSendStyle.root} type="submit" size="small">
              <SendIcon color="secondary"/>
            </IconButton>

          </Box>

        </Box>

      </Slide>
    </>

  )
};

