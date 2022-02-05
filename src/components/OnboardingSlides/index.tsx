import {
  IonButton,
  IonContent,
  IonImg,
  IonRippleEffect,
  IonSlide,
  IonSlides,
} from "@ionic/react";

import Slide1 from "assets/onboarding/slide1.png";
import Slide2 from "assets/onboarding/slide2.png";
import Slide3 from "assets/onboarding/slide3.png";

import React from "react";
import "./styles.scss";

const OnboardingSlides: React.FC<{ onComplete: () => void }> = (props) => {
  const { onComplete } = props;
  return (
    <IonContent fullscreen>
      <IonSlides pager>
        <IonSlide>
          <div className="slide one">
            <div className="slide__text">
              <img src={Slide1} />
              ¿Te aburre planificar los menús?
            </div>
          </div>
        </IonSlide>
        <IonSlide>
          <div className="slide two">
            <div className="slide__text">
              <img src={Slide2} />
              ¿No sabes qué hacer para comer?
            </div>
          </div>
        </IonSlide>
        <IonSlide>
          <div className="slide three">
            <div className="slide__text">
              <img src={Slide3} />
              ¡Nosotros nos encargamos!
            </div>
          </div>
        </IonSlide>

        <IonSlide>
          <div className="slide four">
            <div className="slide__text">
              RandoMenu genera menús aleatorios, pero con tus recetas.
            </div>
            <div className="slide__button-container">
              <button
                onClick={onComplete}
                className="slide__button ion-activatable"
              >
                ¡Vamos!
                <IonRippleEffect></IonRippleEffect>
              </button>
            </div>
          </div>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default OnboardingSlides;
