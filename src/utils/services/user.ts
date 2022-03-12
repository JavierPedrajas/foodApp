import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from ".";
import { IUser } from "../interfaces/user";

export const signupNewUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const sendVerificationEmail = async () => {
  const user = firebaseAuth.currentUser;
  if (user) {
    return sendEmailVerification(user);
  }
  return;
};

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logoutUser = async () => {
  return signOut(firebaseAuth);
};

export const getUserDoc = async () => {
  const logedUser = firebaseAuth.currentUser;
  console.log("logedUser", logedUser);
  if (logedUser) {
    const docRef = doc(firestore, "usuarios", logedUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("docSnap", docSnap.data());
      const docData = docSnap.data() as IUser;
      return docData;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
};

export const addUser = async (usuario: IUser) => {
  const logedUser = firebaseAuth.currentUser;
  if (logedUser) {
    const docRef = doc(firestore, "usuarios", logedUser.uid);
    try {
      await setDoc(docRef, usuario);
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateUser = async (usuario: IUser) => {
  const docRef = doc(firestore, "usuarios", usuario.uid);
  try {
    await updateDoc(docRef, { ...usuario });
  } catch (error) {
    console.log(error);
  }
};
