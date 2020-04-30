import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Header() {

  const padding = {xs:2, sm:2, md:2, lg:2, xl:2};
  const margin = {xs:3, sm:5, md:10, lg:15, xl:20};
  // const fontSize = {xs:"1.5rem", sm:"2rem", md:"2.5rem", lg:"3rem", xl:"3rem"};

  return (
    <Box bgcolor="primary.main" py={{...padding}} boxShadow={3}>
      <Box fontWeight="fontWeightBold" mx={{...margin}}>
        <Typography variant="h3">react-start</Typography>
      </Box>
    </Box>

  );
}

export default Header;
