import {
  IonAlert,
  IonButton,
  IonCheckbox,
  IonModal,
  IonText,
} from "@ionic/react";
import Input from "app/components/Input";
import React, { useState } from "react";
import TermsAndConditions from "app/components/TermsAndConditions";
import { addUser, sendVerificationEmail, signupNewUser } from "lib/services";
import LoadingSpinner from "app/components/LoadingSpinner";
import { FormattedMessage, useIntl } from "react-intl";

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

  const intl = useIntl();

  const successHeader = intl.formatMessage({
    defaultMessage: "Signup completed!",
    id: "9RmcK8",
  });
  const successText = intl.formatMessage({
    defaultMessage:
      "We've sent you a confirmation email, please check your inbox and spam folder",
    id: "x7lYvf",
  });

  const errorHeader = intl.formatMessage({
    defaultMessage: "There was an error",
    id: "Z7vWDQ",
  });

  const errorText = intl.formatMessage({
    defaultMessage: "This email is already in use, please log in",
    id: "WQ++ux",
  });

  const signupHandler = async () => {
    if (!email || !password) return;

    setLoading(true);
    try {
      const newUser = await signupNewUser(email, password);
      await sendVerificationEmail();
      await addUser({
        uid: newUser.user.uid,
        email: email,
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
        <FormattedMessage defaultMessage="Sign up for free!" id="lDBOJP" />
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
          placeholder={intl.formatMessage({
            defaultMessage: "Password",
            id: "5sg7KC",
          })}
          login
        />
        {password && password.length < 6 && (
          <IonText className={"login__signup__passwordlength"}>
            <FormattedMessage
              defaultMessage="Password should contain 6 characters or more"
              id="L57Ym6"
            />
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
          <FormattedMessage
            defaultMessage="I've read and accepted the"
            id="3HeHzW"
          />{" "}
          <span
            className={"login__signup__terms__text__clickable"}
            onClick={() => setTermsOpen(true)}
          >
            <FormattedMessage defaultMessage="terms & conditions" id="ySSFAT" />
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
          <FormattedMessage defaultMessage="Sign up for free!" id="lDBOJP" />
        </IonButton>
      </div>
      <IonText className={"login__signup__switch"}>
        <FormattedMessage
          defaultMessage="You already have an account?"
          id="5aBpjT"
        />{" "}
        <b onClick={backToLogin}>
          <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
        </b>
      </IonText>
    </div>
  );
};

export default Signup;
