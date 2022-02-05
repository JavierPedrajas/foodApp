import React, { useEffect, useState } from "react";
import "./styles.scss";

import { Storage } from "@capacitor/storage";
// import OnboardingSlides from "components/OnboardingSlides";
import { IonContent, IonImg, IonItem, IonLabel } from "@ionic/react";
// import Logo from "assets/logo/rockitt_logo-vert_white.svg";
import Signup from "./Signup";
// import Button from "components/Button";
import Login from "./Login";
import Button from "../../components/Button";
import OnboardingSlides from "../../components/OnboardingSlides";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";

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
            <Button type="main" handleClick={() => setCurrentPage("signup")}>
              Regístrate gratis
            </Button>
            <Button type="outlined" handleClick={() => setCurrentPage("login")}>
              Iniciar sesión
            </Button>
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
