import React, {useContext} from "react";
import {useHistory, Redirect} from "react-router-dom";
import {AuthContext} from "./firebase/Auth";
import firebase from "./firebase/Firebase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Grid from "@material-ui/core/Grid";

export default function Home(){

  const history = useHistory();
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/secret" />
  }

  const onAnonymousLogin = ()=>{
    firebase.auth().signInAnonymously().then().catch(err=>console.log(err));
  };

  function onLoginClick() {
    history.push("/login");
  }

  function onRegisterClick() {
    history.push("/register");
  }

  const iconStyle = {
    root:{
      fontSize: "10rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  }

  const titleStyle = {
    root:{
      fontSize: "5rem",
      color: "red",
      margin: "1rem auto 0 auto"
    }
  }

  const boxForButtons = {
    root:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
      marginTop: "1rem",
    }
  }

  const buttonRegisterAndLoginStyle = {
    root:{
      width: "48%",
    }
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">

      <AccountCircleOutlinedIcon style={iconStyle.root}/>
      <Typography style={titleStyle.root}>Enter Secret</Typography>

      <Box style={boxForButtons.root}>
        <Button variant="contained" color="primary" style={buttonRegisterAndLoginStyle.root}
                onClick={onRegisterClick}>
          Resgister
        </Button>
        <Button variant="contained" color="primary" style={buttonRegisterAndLoginStyle.root}
                onClick={onLoginClick}>
          Login
        </Button>
      </Box>

      <Box style={boxForButtons.root}>
        <Button variant="contained" color="primary" fullWidth
                onClick={onAnonymousLogin}>
          Anonymous Login
        </Button>
      </Box>

    </Grid>
  );
};
