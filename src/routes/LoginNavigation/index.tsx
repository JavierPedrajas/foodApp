import { IonRouterOutlet } from "@ionic/react";
import LoginPage from "../../app/pages/LoginPage";
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router";

const LoginNavigation: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        <LoginPage />
      </Route>

      <Route render={() => <Redirect to={"/login"} />} />
    </IonRouterOutlet>
  );
};

export default LoginNavigation;
