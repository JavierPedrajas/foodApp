import React, { useEffect, useState } from "react";
import "./styles.scss";

import { Storage } from "@capacitor/storage";
// import OnboardingSlides from "components/OnboardingSlides";
import { IonButton } from "@ionic/react";
// import Logo from "assets/logo/rockitt_logo-vert_white.svg";
import Signup from "./Signup";
// import Button from "components/Button";
import Login from "./Login";
import OnboardingSlides from "app/components/OnboardingSlides";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";

type TCurrentPage = "main" | "login" | "signup";

const LoginPage: React.FC = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(true);
  const [currentPage, setCurrentPage] = useState<TCurrentPage>("main");

  const checkOnboarding = async () => {
    const { value } = await Storage.get({ key: "randomenu_onboarding" });
    if (value) {
      setOnboardingCompleted(true);
    } else {
      setOnboardingCompleted(false);
    }
  };

  const completeOnboarding = async () => {
    await Storage.set({ key: "randomenu_onboarding", value: "true" });
    setOnboardingCompleted(true);
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (!onboardingCompleted) {
    return <OnboardingSlides onComplete={completeOnboarding} />;
  }

  const randomNumber = Math.floor(Math.random() * (4 - 1)) + 1;

  let imgRandom = "one";

  switch (randomNumber) {
    case 2:
      imgRandom = "two";
      break;
    case 3:
      imgRandom = "three";
      break;
    case 4:
      imgRandom = "four";
      break;

    default:
      imgRandom = "one";
      break;
  }

  return (
    <div className={`login ${imgRandom}`}>
      {currentPage === "main" && (
        <>
          <div className="login__main__logo">
            <FontAwesomeIcon icon={faCarrot} />
            RandoMenu
          </div>
          <div className="login__main__buttons">
            <IonButton fill="solid" onClick={() => setCurrentPage("signup")}>
              <FormattedMessage
                defaultMessage="Sign up for free!"
                id="lDBOJP"
              />
            </IonButton>
            <IonButton fill="outline" onClick={() => setCurrentPage("login")}>
              <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
            </IonButton>
          </div>
        </>
      )}
      {currentPage === "login" && (
        <Login backtoSignup={() => setCurrentPage("signup")} />
      )}
      {currentPage === "signup" && (
        <Signup backToLogin={() => setCurrentPage("login")} />
      )}
    </div>
  );
};

export default LoginPage;
