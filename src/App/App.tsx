import { Redirect, Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "lib/theme/variables.css";
import MainTabs from "../routes/mainTabs";
import SideMenu from "../routes/sideMenu";
import Recipes from "./pages/Recipes";
import "lib/theme/styles.scss";
import { firebaseAuth, logoutUser } from "../lib/services";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginNavigation from "routes/loginNavigation";
import Ingredients from "app/pages/Ingredients";
import Profile from "app/pages/Profile";
import Config from "app/pages/ConfigPage";
import Schedule from "app/pages/Schedule";

import LangContextWrapper from "lib/context/LangContext";
import { Provider } from "react-redux";
import { store } from "lib/store";
import InitStore from "app/components/InitStore";

setupIonicReact();

const App: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<
    "pending" | "logedIn" | "logedOut" | "notVerified"
  >("pending");
  const [loginDetails, setLoginDetails] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setLoginStatus("logedIn");
        } else {
          setLoginStatus("notVerified");
        }
        setLoginDetails(user);
      } else {
        setLoginStatus("logedOut");
        setLoginDetails(undefined);
      }
    });
  }, []);

  if (loginStatus === "pending") {
    return (
      <LangContextWrapper loginStatus={loginStatus}>
        <IonApp>
          <LoadingSpinner open />
        </IonApp>
      </LangContextWrapper>
    );
  }

  if (loginStatus === "notVerified") {
    return (
      <LangContextWrapper loginStatus={loginStatus}>
        <IonApp>
          <IonAlert
            isOpen
            onDidDismiss={logoutUser}
            message={
              "Tu email no ha sido verificado, por favor revisa tu bandeja de entrada"
            }
            buttons={[{ text: "Cerrar" }]}
          />
        </IonApp>
      </LangContextWrapper>
    );
  }

  if (loginStatus === "logedOut") {
    return (
      <LangContextWrapper loginStatus={loginStatus}>
        <IonApp>
          <IonReactRouter>
            <LoginNavigation />
          </IonReactRouter>
        </IonApp>
      </LangContextWrapper>
    );
  }

  return (
    <Provider store={store}>
      <InitStore />
      <LangContextWrapper loginStatus={loginStatus}>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <SideMenu />
              <IonRouterOutlet id="main">
                <Route path="/tabs" component={MainTabs} />
                <Route path="/recipes" component={Recipes} exact />
                <Route path="/ingredients" component={Ingredients} exact />
                <Route path="/schedule" component={Schedule} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="/config" component={Config} exact />
                <Redirect from="/" exact to="/tabs/today" />
                <Redirect from="/login" exact to="/tabs/today" />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </LangContextWrapper>
    </Provider>
  );
};

export default App;
