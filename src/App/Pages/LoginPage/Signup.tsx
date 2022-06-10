import { IonAlert, IonButton, IonCheckbox, IonModal } from "@ionic/react";
import Input from "app/components/Input";
import React, { useState } from "react";
import TermsAndConditions from "app/components/TermsAndConditions";
import { addUser, sendVerificationEmail, signupNewUser } from "lib/services";
import LoadingSpinner from "app/components/LoadingSpinner";
import { FormattedMessage, useIntl } from "react-intl";
import { LoginSignupContainer } from "app/components/SharedStyledComponents";
import {
  AuthHeader,
  AuthSwitch,
  BoldText,
  LoginMarginBottom,
  LoginSignupButtonsContainer,
  PasswordLengthWarning,
} from "app/pages/LoginPage";

import styled from "styled-components";

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
    <LoginSignupContainer>
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
      <SignupModal isOpen={termsOpen}>
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
      </SignupModal>
      <AuthHeader>
        <FormattedMessage defaultMessage="Sign up for free!" id="lDBOJP" />
      </AuthHeader>
      <LoginMarginBottom>
        <Input
          inputType="email"
          handleChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          login
        />
      </LoginMarginBottom>
      <LoginMarginBottom>
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
          <PasswordLengthWarning>
            <FormattedMessage
              defaultMessage="Password should contain 6 characters or more"
              id="L57Ym6"
            />
          </PasswordLengthWarning>
        )}
      </LoginMarginBottom>
      <TermsContainer>
        <IonCheckbox
          checked={termsAccepted}
          onClick={() =>
            termsAccepted ? setTermsAccepted(false) : setTermsOpen(true)
          }
          color="primary"
        />
        <TermsText>
          <FormattedMessage
            defaultMessage="I've read and accepted the"
            id="3HeHzW"
          />{" "}
          <TermsClickable onClick={() => setTermsOpen(true)}>
            <FormattedMessage defaultMessage="terms & conditions" id="ySSFAT" />
          </TermsClickable>
        </TermsText>
      </TermsContainer>
      <LoginSignupButtonsContainer>
        <IonButton
          fill="solid"
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
      </LoginSignupButtonsContainer>
      <AuthSwitch>
        <FormattedMessage
          defaultMessage="You already have an account?"
          id="5aBpjT"
        />{" "}
        <BoldText onClick={backToLogin}>
          <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
        </BoldText>
      </AuthSwitch>
    </LoginSignupContainer>
  );
};

export default Signup;

const SignupModal = styled(IonModal)`
  &::part(content) {
    overflow-y: scroll;
  }
`;

const TermsContainer = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.2rem;
  margin-left: 4rem;
  font-size: 1.3rem;
`;

const TermsText = styled.div`
  width: 70%;
  margin-left: 1rem;
`;
const TermsClickable = styled.span`
  font-weight: 600;
  margin-left: 0.3rem;
`;
