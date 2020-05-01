import React, {useContext, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Grid from "@material-ui/core/Grid";
import ChatClient from "./ChatClient";
import {AuthContext} from "./datastore/Auth";
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import useIO from "./useIO";

export default function Home(){

  const {style} = useContext(AuthContext);

  const [observer, setElements, entries] = useIO({
    threshold: 0.1,
    root: null
  });

  const test = Array.from({length: 1000}, (v, k) => k + 1);

  useEffect(() => {
    let item = Array.from(document.getElementsByClassName("lazy"));
    setElements(item)
  }, [setElements]);

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let box = entry.target;
        box.style.visibility = "visible";
        box.classList.remove("lazy");
        observer.unobserve(box);
      }
    })
  }, [entries, observer]);

  const icon = ()=>{
    if (style){
      return (
        <Zoom in={true}>
          <AccountCircleOutlinedIcon style={style.iconStyle}/>
        </Zoom>
      )
    }
  };

  const text = ()=>{
    if (style){
      return test.map(value => {
        return (
          <Box key={value} className="lazy" style={{visibility:"hidden"}}>
            <Typography style={style.titleStyle}>Enter Secret</Typography>
          </Box>
        )
      });
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
