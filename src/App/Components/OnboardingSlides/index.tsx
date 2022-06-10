import { IonContent, IonRippleEffect, IonSlide, IonSlides } from "@ionic/react";

import Slide1 from "assets/onboarding/slide1.png";
import Slide2 from "assets/onboarding/slide2.png";
import Slide3 from "assets/onboarding/slide3.png";

import React from "react";
import styled from "styled-components";

const OnboardingSlides: React.FC<{ onComplete: () => void }> = (props) => {
  const { onComplete } = props;
  return (
    <IonContent fullscreen>
      <IonSlides pager>
        <IonSlide>
          <SlideBase>
            <SlideText>
              <SlideImg src={Slide1} />
              ¿Te aburre planificar los menús?
            </SlideText>
          </SlideBase>
        </IonSlide>
        <IonSlide>
          <SlideBase>
            <SlideText>
              <SlideImg src={Slide2} />
              ¿No sabes qué hacer para comer?
            </SlideText>
          </SlideBase>
        </IonSlide>
        <IonSlide>
          <SlideBase>
            <SlideText>
              <SlideImg src={Slide3} />
              ¡Nosotros nos encargamos!
            </SlideText>
          </SlideBase>
        </IonSlide>

        <IonSlide>
          <SlideBase>
            <SlideText>
              RandoMenu genera menús aleatorios, pero con tus recetas.
            </SlideText>
            <ButtonContainer>
              <Button onClick={onComplete} className="ion-activatable">
                ¡Vamos!
                <IonRippleEffect></IonRippleEffect>
              </Button>
            </ButtonContainer>
          </SlideBase>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default OnboardingSlides;

const SlideBase = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position-x: center;
  position: relative;
  color: var(--light);
`;

const SlideText = styled.div`
  font-size: 3.5rem;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  font-size: 2rem;
  font-weight: 600;
  background-color: var(--main);
  padding: 1rem 4rem;
  border-radius: 15px;
`;

const SlideImg = styled.img``;
