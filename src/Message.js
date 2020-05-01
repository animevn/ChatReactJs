import React, {useContext} from "react";
import {AuthContext} from "./datastore/Auth";
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
      margin: "0.5rem",
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      alignItems:"center",
    }
  };

  const messageReceiveTextStyle = {
    root:{
      margin: "1rem",
      multiline: true,
      wordWrap: "break-word",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "0.5rem",
    }
  }

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
      <Box style={messageReceiveStyle.root}>
        <SentimentVerySatisfiedRoundedIcon/>
        <Box style={messageReceiveTextStyle.root} boxShadow={3}>
          {props.body}
        </Box>
      </Box>
    );
  }
}
