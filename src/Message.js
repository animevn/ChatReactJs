import React, {useContext} from "react";
import {AuthContext} from "./firebase/Auth";
import Box from "@material-ui/core/Box";
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import {Typography} from "@material-ui/core";

export default function Message(props){

  const {currentUser} = useContext(AuthContext);

  const messageSendStyle = {
    root:{
      width:"60%",
      margin: "1rem",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      multiline: true,
      backgroundColor: "palegreen",
      wordWrap: "break-word",
    }
  };

  const messageReceiveStyle = {
    root:{
      width:"60%",
      margin: "1rem",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      multiline: true,
      backgroundColor: "white",
      wordWrap: "break-word",
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
    }
  };

  if (currentUser.uid === props.sender){
    return (
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Box boxShadow={3} style={messageSendStyle.root}>
            <Typography>{props.body}</Typography>
          </Box>
        </Box>
    )
  }else{
    return (
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Box boxShadow={3}
             style={messageReceiveStyle.root}
        >
          <SentimentVerySatisfiedRoundedIcon/>
          {props.body}
        </Box>
      </Box>
    );
  }
}
