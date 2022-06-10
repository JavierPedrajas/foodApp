import React, { useEffect, useState } from "react";

import { Storage } from "@capacitor/storage";
// import OnboardingSlides from "components/OnboardingSlides";
import { IonButton, IonText } from "@ionic/react";
// import Logo from "assets/logo/rockitt_logo-vert_white.svg";
import Signup from "./Signup";
// import Button from "components/Button";
import Login from "./Login";
import OnboardingSlides from "app/components/OnboardingSlides";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import img1 from "assets/loginImg/img1.png";
import img2 from "assets/loginImg/img2.png";
import img3 from "assets/loginImg/img3.png";
import img4 from "assets/loginImg/img4.png";

type TCurrentPage = "main" | "login" | "signup";

const LoginPage: React.FC = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(true);
  const [currentPage, setCurrentPage] = useState<TCurrentPage>("main");
  const [backgroundImage, setBackgroundImage] = useState("");

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
    getRandomImage();
    checkOnboarding();
  }, []);

  if (!onboardingCompleted) {
    return <OnboardingSlides onComplete={completeOnboarding} />;
  }

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * (4 - 1)) + 1;
    switch (randomNumber) {
      case 2:
        setBackgroundImage(img2);
        break;
      case 3:
        setBackgroundImage(img3);
        break;
      case 4:
        setBackgroundImage(img4);
        break;
      default:
        setBackgroundImage(img1);
        break;
    }
  };

  return (
    <LoginBackground bgImg={backgroundImage}>
      {currentPage === "main" && (
        <>
          <LogoContainer>
            <FontAwesomeIcon icon={faCarrot} />
            RandoMenu
          </LogoContainer>
          <MainAuthButtonsContainer>
            <IonButton fill="solid" onClick={() => setCurrentPage("signup")}>
              <FormattedMessage
                defaultMessage="Sign up for free!"
                id="lDBOJP"
              />
            </IonButton>
            <IonButton fill="outline" onClick={() => setCurrentPage("login")}>
              <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
            </IonButton>
          </MainAuthButtonsContainer>
        </>
      )}
      {currentPage === "login" && (
        <Login backtoSignup={() => setCurrentPage("signup")} />
      )}
      {currentPage === "signup" && (
        <Signup backToLogin={() => setCurrentPage("login")} />
      )}
    </LoginBackground>
  );
};

export default LoginPage;

const LoginBackground = styled.div<{ bgImg: string }>`
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position-x: center;
  background-image: linear-gradient(
      to bottom,
      rgba(25, 30, 36, 0.9),
      rgba(25, 30, 36, 0.9)
    ),
    url(${(props) => props.bgImg});
`;

const LogoContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  text-align: center;
  color: var(--main);
`;

const MainAuthButtonsContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  width: 95%;
  display: flex;
  flex-direction: column;
`;

export const LoginMarginBottom = styled.div`
  width: 80%;
  margin-bottom: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginSignupButtonsContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
`;

export const BoldText = styled.b``;

export const AuthHeader = styled(IonText)`
  font-size: 1.6rem;
  font-weight: 600;
  // text-transform: uppercase;
  margin: 5rem 0 2.2rem;
  color: white;
`;

export const PasswordLengthWarning = styled(IonText)`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  font-weight: 600;
`;

export const AuthSwitch = styled(IonText)`
  margin-top: 5rem;
  font-size: 1.2rem;
  color: white;
`;
