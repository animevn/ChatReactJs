import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Grid from "@material-ui/core/Grid";
import ChatClient from "./ChatClient";
import {AuthContext} from "./datastore/Auth";
import Zoom from "@material-ui/core/Zoom";
import {FixedSizeList} from "react-window";
import Box from "@material-ui/core/Box";

export default function Home(){

  const {styleStore} = useContext(AuthContext);

  const icon = ()=>{
    if (styleStore){
      return (
        <Zoom in={true}>
          <AccountCircleOutlinedIcon style={styleStore.iconStyle}/>
        </Zoom>
      )
    }
  };

  const Row = ({style}) => (
    <div style={style}>
      <Box boxShadow={3} width="60%" mx="auto">
        <AccountCircleOutlinedIcon style={styleStore.iconStyle}/>
        <Typography style={styleStore.titleStyle}>Enter Secret</Typography>
      </Box>
    </div>
  );

  const scrollStyle = {
    scrollbarWidth: "none",
  }

  const text = ()=>{
    if (styleStore){
      return (
        <FixedSizeList
          itemCount={1000}
          height={500}
          width="90%"
          itemSize={150}
          style={scrollStyle}
        >
          {Row}
        </FixedSizeList>
      )
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {icon()}
      {text()}
      <ChatClient/>
    </Grid>
  );
};
