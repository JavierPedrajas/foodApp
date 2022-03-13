import { IonText } from "@ionic/react";
import Button from "components/Button";
import Input from "components/Input";
// import EmailIcon from "assets/icons/email.svg";
// import PasswordIcon from "assets/icons/password.svg";
import React, { useState } from "react";
import "./styles.scss";
import { loginUser } from "utils/services";
import LoadingSpinner from "components/LoadingSpinner";
import { FormattedMessage } from "react-intl";
import { useFormatMessage } from "languages/utils";

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

  return (
    <div className={"login__signup"}>
      <LoadingSpinner open={loading} />
      <IonText className={"login__signup__header"}>
        <FormattedMessage id={"pages.LoginPage.Login"} />
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
      <div className="login__signup__buttons">
        <Button
          type="main"
          handleClick={handleLogin}
          disabled={
            !email ||
            !password ||
            (password != undefined && password.length < 6)
          }
        >
          <FormattedMessage id={"pages.LoginPage.Login"} />
        </Button>
      </div>
      <IonText className={"login__signup__switch"}>
        <FormattedMessage id={"pages.LoginPage.Login.NoAccount"} />{" "}
        <b onClick={backtoSignup}>
          <FormattedMessage id={"pages.LoginPage.Signup"} />
        </b>
      </IonText>
    </div>
  );
};

export default Login;
