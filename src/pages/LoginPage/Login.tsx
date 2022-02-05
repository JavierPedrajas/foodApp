import { IonText } from "@ionic/react";
import Button from "components/Button";
import Input from "components/Input";
// import EmailIcon from "assets/icons/email.svg";
// import PasswordIcon from "assets/icons/password.svg";
import React, { useState } from "react";
import "./styles.scss";
import { loginUser } from "utils/services";
import LoadingSpinner from "components/LoadingSpinner";

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
      <IonText className={"login__signup__header"}>Iniciar sesión</IonText>
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
          placeholder="Contraseña"
          // icon={PasswordIcon}
          login
        />
        {password && password.length < 6 && (
          <IonText className={"login__signup__passwordlength"}>
            La contraseña debe tener 6 o más caracteres
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
          Iniciar sesión
        </Button>
      </div>
      <IonText className={"login__signup__switch"}>
        ¿No tienes una cuenta? <b onClick={backtoSignup}>Regístrate gratis</b>
      </IonText>
    </div>
  );
};

export default Login;
