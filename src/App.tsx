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
import "./theme/variables.css";
import MainTabs from "./routes/MainTabs";
import SideMenu from "./routes/SideMenu";
import Recipes from "./pages/Recipes";
import "./theme/styles.scss";
import { firebaseAuth, logoutUser } from "./utils/services";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import LoadingSpinner from "./components/LoadingSpinner";

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

  // const getLogin = async () => {
  //   const auxDetails = await checkLogin();
  //   if (auxDetails) {
  //     setLoginDetails(auxDetails);
  //   }
  // };

  if (loginStatus === "pending") {
    return (
      <IonApp>
        <LoadingSpinner open />
      </IonApp>
    );
  }

  if (loginStatus === "notVerified") {
    return (
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
    );
  }

  // if (loginStatus === "logedOut") {
  //   return (
  //     <IonApp>
  //       <IonReactRouter>
  //         <LoginNavigation />
  //       </IonReactRouter>
  //     </IonApp>
  //   );
  // }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <SideMenu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" component={MainTabs} />
            <Route path="/recipes" component={Recipes} exact />
            <Redirect from="/" exact to="/tabs/today" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
