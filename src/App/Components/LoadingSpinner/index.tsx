import { IonLoading } from "@ionic/react";
import React from "react";
import "./styles.scss";

interface ILoadingSpinnerProps {
  open: boolean;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = (props) => {
  const { open } = props;
  // to check how to apply styled component
  return <IonLoading isOpen={open} spinner="bubbles" cssClass="spinner" />;
};

export default LoadingSpinner;
