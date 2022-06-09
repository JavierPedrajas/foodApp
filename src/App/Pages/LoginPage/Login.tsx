import { IonButton, IonText } from "@ionic/react";
import Input from "app/components/Input";
// import EmailIcon from "assets/icons/email.svg";
// import PasswordIcon from "assets/icons/password.svg";
import React, { useState } from "react";
import "./styles.scss";
import { loginUser } from "lib/services";
import LoadingSpinner from "app/components/LoadingSpinner";
import { FormattedMessage, useIntl } from "react-intl";

interface LoginProps {
  backtoSignup: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { backtoSignup } = props;

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await loginUser(email!, password!);
    setLoading(false);
  };
  const intl = useIntl();

  return (
    <div className={"login__signup"}>
      <LoadingSpinner open={loading} />
      <IonText className={"login__signup__header"}>
        <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
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
          // icon={PasswordIcon}
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
      <div className="login__signup__buttons">
        <IonButton
          fill="solid"
          // type="main"
          onClick={handleLogin}
          disabled={
            !email ||
            !password ||
            (password != undefined && password.length < 6)
          }
        >
          <FormattedMessage defaultMessage="Log In" id="r2Jjms" />
        </IonButton>
      </div>
      <IonText className={"login__signup__switch"}>
        <FormattedMessage
          defaultMessage="You don't have an account?"
          id="9nKRpS"
        />{" "}
        <b onClick={backtoSignup}>
          <FormattedMessage defaultMessage="Sign up for free!" id="lDBOJP" />
        </b>
      </IonText>
    </div>
  );
};

export default Login;
