import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import Cookies from "universal-cookie";

interface PublicRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
    restricted:any;
}

const cookies = new Cookies();
/**
 * This function help to unrestirct the url that  
 * need login
 * 
 * @function PublicRoute()  
 */

const PublicRoute:FunctionComponent<PublicRouteProps> = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            cookies.get("userinfo")  && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;