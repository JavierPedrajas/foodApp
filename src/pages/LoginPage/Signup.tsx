import {
  IonAlert,
  IonButton,
  IonCheckbox,
  IonInput,
  IonModal,
  IonText,
} from "@ionic/react";
import Button from "components/Button";
import Input from "components/Input";
import React, { useEffect, useState } from "react";
// import EmailIcon from "assets/icons/email.svg";
// import PasswordIcon from "assets/icons/password.svg";
import TermsAndConditions from "components/TermsAndConditions";
import { addUser, sendVerificationEmail, signupNewUser } from "utils/services";
import LoadingSpinner from "components/LoadingSpinner";
import { FormattedMessage } from "react-intl";
import { useFormatMessage } from "languages/utils";

interface SignupProps {
  backToLogin: () => void;
}

const Signup: React.FC<SignupProps> = (props) => {
  const { backToLogin } = props;

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [termsOpen, setTermsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loginAlert, setLoginAlert] = useState<{
    open: boolean;
    text: string;
    header: string;
  }>({ open: false, text: "", header: "" });

  const successHeader = useFormatMessage("pages.LoginPage.Signup.Completed");
  const successText = useFormatMessage("pages.LoginPage.Signup.EmailSent");

  const errorHeader = useFormatMessage("pages.LoginPage.Signup.Error");
  const errorText = useFormatMessage("pages.LoginPage.Signup.EmailInUse");

  const signupHandler = async () => {
    setLoading(true);
    try {
      const newUser = await signupNewUser(email!, password!);
      await sendVerificationEmail();
      await addUser({
        uid: newUser.user.uid,
        email: email!,
        config: {
          language: navigator.language === "es-ES" ? "es-ES" : "en-US",
        },
      });
      setLoading(false);

      setLoginAlert({
        open: true,
        header: successHeader,
        text: successText,
      });
    } catch (error) {
      setLoading(false);

      setLoginAlert({
        open: true,
        header: errorHeader,
        text: errorText,
      });
    }
  };

  return (
    <div className={"login__signup"}>
      <LoadingSpinner open={loading} />
      <IonAlert
        header={loginAlert.header}
        isOpen={loginAlert.open}
        message={loginAlert.text}
        onDidDismiss={() => {
          setLoginAlert({ open: false, text: "", header: "" });
          backToLogin();
        }}
        buttons={[{ text: "Cerrar" }]}
      />
      <IonModal isOpen={termsOpen} className={"login__signup__modal"}>
        <TermsAndConditions
          onConfirm={() => {
            setTermsAccepted(true);
            setTermsOpen(false);
          }}
          onReject={() => {
            setTermsAccepted(false);
            setTermsOpen(false);
          }}
        />
      </IonModal>
      <IonText className={"login__signup__header"}>
        <FormattedMessage id={"pages.LoginPage.Signup"} />
      </IonText>
      <div className={"login__signup__margin-bottom"}>
        <Input
          inputType="email"
          handleChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          // icon={EmailIcon}
          login
        />
      </div>
      <div className={"login__signup__margin-bottom"}>
        <Input
          inputType="password"
          handleChange={(event) => setPassword(event.target.value)}
          placeholder={useFormatMessage("pages.LoginPage.Login.Password")}
          // icon={PasswordIcon}
          login
        />
        {password && password.length < 6 && (
          <IonText className={"login__signup__passwordlength"}>
            <FormattedMessage id={"pages.LoginPage.Login.PasswordLength"} />
          </IonText>
        )}
      </div>
      <div className={"login__signup__terms"}>
        <IonCheckbox
          checked={termsAccepted}
          onClick={() =>
            termsAccepted ? setTermsAccepted(false) : setTermsOpen(true)
          }
          color="primary"
        />
        <div className={"login__signup__terms__text"}>
          <FormattedMessage id={"pages.LoginPage.Signup.ReadAndAccept"} />{" "}
          <span
            className={"login__signup__terms__text__clickable"}
            onClick={() => setTermsOpen(true)}
          >
            <FormattedMessage id={"pages.LoginPage.Signup.Terms"} />
          </span>
        </div>
      </div>
      <div className="login__signup__buttons">
        <IonButton
          fill="solid"
          // type="main"
          onClick={signupHandler}
          disabled={
            !email ||
            !password ||
            !termsAccepted ||
            (password != undefined && password.length < 6)
          }
        >
          <FormattedMessage id={"pages.LoginPage.Signup"} />
        </IonButton>
      </div>
      <IonText className={"login__signup__switch"}>
        <FormattedMessage id={"pages.LoginPage.Signup.AlreadyAccount"} />{" "}
        <b onClick={backToLogin}>
          <FormattedMessage id={"pages.LoginPage.Login"} />
        </b>
      </IonText>
    </div>
  );
};

export default Signup;
