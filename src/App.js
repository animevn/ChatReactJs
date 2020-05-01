import React from "react";
import Header from "./main/Header"
import Footer from "./main/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthProvider} from "./datastore/Auth";
import PrivateRoute from "./store/PrivateRoute";
import Home from "./Home";
import Login from "./store/Login";
import Register from "./store/Register";
import Secret from "./store/Secret";
import {FirestoreProvider} from "./datastore/Firestore";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const App = ()=>{

  return (
   <AuthProvider>
     <FirestoreProvider>
       <Router>
         <Box display="flex" flexDirection="column" justifyContent="space-between" minHeight="100vh">
           <Grid>
             <Header/>
             {/*app body goes down here*/}

             <Route exact path="/" component={Home}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/register" component={Register}/>
             <PrivateRoute exact path="/secret" component={Secret}/>

             {/*app body goes up here hahaha */}
           </Grid>
           <Footer/>
         </Box>
       </Router>
     </FirestoreProvider>
   </AuthProvider>
  );
};

export default App;
