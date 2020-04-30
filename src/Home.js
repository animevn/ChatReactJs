import React from "react";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Grid from "@material-ui/core/Grid";
import ChatClient from "./ChatClient";

export default function Home(){

  const iconStyle = {
    root:{
      fontSize: "10rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  };

  const titleStyle = {
    root:{
      fontSize: "2rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">

      <AccountCircleOutlinedIcon style={iconStyle.root}/>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>
      <Typography style={titleStyle.root}>Enter Secret</Typography>

      <ChatClient/>

    </Grid>
  );
};
