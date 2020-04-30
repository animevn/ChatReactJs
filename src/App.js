import React from "react";
import Header from "./main/Header"
import Footer from "./main/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthProvider} from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Secret from "./Secret";
import {FirestoreProvider} from "./utils/Firestore";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const App = ()=>{

  return (
   <AuthProvider>
     <Router>
       <Box display="flex" flexDirection="column" justifyContent="space-between" minHeight="100vh">
         <Grid>
           <Header/>
           {/*app body goes down here*/}

           <Route exact path="/" component={Home}/>
           <Route exact path="/login" component={Login}/>
           <Route exact path="/register" component={Register}/>
           <FirestoreProvider>
             <PrivateRoute exact path="/secret" component={Secret}/>
           </FirestoreProvider>

           {/*app body goes up here hahaha */}
         </Grid>
         <Footer/>
       </Box>
     </Router>
   </AuthProvider>
  );
};

export default App;
