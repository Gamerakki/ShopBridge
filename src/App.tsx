import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import Cookies from "universal-cookie";
import PublicRoute from './auth/PublicRoute';
import Routes from './globalConstant/globalConstant';
import NavigationBar from './components/NavigationBar';
import { ToastContainer } from 'react-toastify';

const cookies = new Cookies();
const loggedin = true;

export default function App() {
  return (
    <Router>
      <div>
      <ToastContainer />

      {cookies.get("userinfo") ? <NavigationBar /> : null}
        <Switch>

          <PrivateRoute component={Dashboard} path="/dashboard" exact />
         
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          {Routes.map((route: any) => (
            <PrivateRoute component={route.component} path={route.path} exact />
          
        ))}
          <Route path="/" render={props => (
            cookies.get("userinfo")  ?
                <Redirect to="/dashboard" />
            :   <Redirect to="/login" />
        )} />


        </Switch>

      
      </div>
    </Router>
  );
}

