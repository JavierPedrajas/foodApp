import {
  IonAlert,
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

  const signupHandler = async () => {
    setLoading(true);
    try {
      const newUser = await signupNewUser(email!, password!);
      await sendVerificationEmail();
      console.log("newUser", newUser);
      await addUser({ uid: newUser.user.uid, email: email! });
      setLoading(false);

      setLoginAlert({
        open: true,
        header: "Registro completado!",
        text: "Te hemos enviado un email de confirmación, por favor revisa tu bandeja de entrada y spam",
      });
    } catch (error) {
      setLoading(false);

      setLoginAlert({
        open: true,
        header: "Ha habido un error",
        text: "Este email ya está en uso, por favor inicia sesión",
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
      <IonText className={"login__signup__header"}>Regístrate gratis</IonText>
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
      <div className={"login__signup__terms"}>
        <IonCheckbox
          checked={termsAccepted}
          onClick={() =>
            termsAccepted ? setTermsAccepted(false) : setTermsOpen(true)
          }
          color="primary"
        />
        <div className={"login__signup__terms__text"}>
          He leído y acepto los{" "}
          <span
            className={"login__signup__terms__text__clickable"}
            onClick={() => setTermsOpen(true)}
          >
            términos y condiciones de uso
          </span>
        </div>
      </div>
      <div className="login__signup__buttons">
        <Button
          type="main"
          handleClick={signupHandler}
          disabled={
            !email ||
            !password ||
            !termsAccepted ||
            (password != undefined && password.length < 6)
          }
        >
          Registrarme
        </Button>
      </div>
      <IonText className={"login__signup__switch"}>
        ¿Ya tienes una cuenta? <b onClick={backToLogin}>Inicia sesión</b>
      </IonText>
    </div>
  );
};

export default Signup;
