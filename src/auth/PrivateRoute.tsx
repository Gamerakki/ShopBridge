import React, { FunctionComponent } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";

import Cookies from "universal-cookie";

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const cookies = new Cookies();
/**
 * This function help to restirct the url that  
 * need login
 * 
 * @function PrivateRoute()  
 */
const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
    console.log(Component)
  return (

    <Route
      {...rest}
      render={(props) =>
        cookies.get("userinfo") ? ( //put your authenticate logic here
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
