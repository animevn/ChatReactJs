import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Grid from "@material-ui/core/Grid";
import ChatClient from "./ChatClient";
import {AuthContext} from "./datastore/Auth";
import Zoom from "@material-ui/core/Zoom";
import firebase from "./datastore/Firebase";

export default function Home(){

  const {style} = useContext(AuthContext);

  const homeStyle = {
    iconStyle:{
      fontSize: "10rem",
      color: "red",
      margin: "1rem auto 0 auto"
    },
    titleStyle:{
      fontSize: "2rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  };



  const icon = ()=>{
    if (style){
      return (
        <Zoom in={true}>
          <AccountCircleOutlinedIcon style={style.iconStyle}/>
        </Zoom>
      )
    }
  }

  const text = ()=>{
    if (style){
      return (
        <Zoom in={true}>
          <Typography style={style.titleStyle}>Enter Secret</Typography>
        </Zoom>
      )
    }
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">

      {icon()}
      {text()}

      <ChatClient/>

    </Grid>
  );
};
