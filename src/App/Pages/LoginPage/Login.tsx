import { IonButton } from "@ionic/react";
import Input from "app/components/Input";
import React, { useState } from "react";
import { loginUser } from "lib/services";
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

interface LoginProps {
  backtoSignup: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { backtoSignup } = props;

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    await loginUser(email, password);
    setLoading(false);
  };
  const intl = useIntl();

  return (
    <LoginSignupContainer>
      <LoadingSpinner open={loading} />
      <AuthHeader>
        <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
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
      <LoginSignupButtonsContainer>
        <IonButton
          fill="solid"
          onClick={handleLogin}
          disabled={
            !email ||
            !password ||
            (password != undefined && password.length < 6)
          }
        >
          <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
        </IonButton>
      </LoginSignupButtonsContainer>
      <AuthSwitch>
        <FormattedMessage
          defaultMessage="You don't have an account?"
          id="9nKRpS"
        />{" "}
        <BoldText onClick={backtoSignup}>
          <FormattedMessage defaultMessage="Sign up for free!" id="lDBOJP" />
        </BoldText>
      </AuthSwitch>
    </LoginSignupContainer>
  );
};

export default Login;
