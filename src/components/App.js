import React from "react";
import Singup from './Singup';
import Dashboard from './Dashboard'
import Login from './Login'
import {Container} from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {
  return (
     <Container
     style = {{minHeight:'100vh', height:'auto', minWidth: "100vw", display:"flex", justifyContent: "center", alignItems: "center", alignContent: "center"}}
     >
        <div className="w-100" style = {{minWidth: '90%', height:'auto', display:"flex", justifyContent: "center", alignItems: "center", alignContent: "center", background:'#FF0000'}}>
          <Router> 
            <AuthProvider>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/signup" component={Singup} />
                  <Route path="/login" component={Login}/>
                </Switch>
            </AuthProvider>
          </Router>  
        </div>
     </Container>
  )
}

export default App
