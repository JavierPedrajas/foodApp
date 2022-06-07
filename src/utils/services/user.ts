import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from ".";
import { IUser } from "Utils/Interfaces/user";

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
  if (logedUser) {
    const docRef = doc(firestore, "users", logedUser.uid);
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
    const userDocRef = doc(firestore, "users", logedUser.uid);
    const ingredientsDocRef = doc(firestore, "ingredients", logedUser.uid);
    const recipesDocRef = doc(firestore, "recipes", logedUser.uid);
    const scheduleDocRef = doc(firestore, "schedule", logedUser.uid);
    const calendarDocRef = doc(firestore, "calendar", logedUser.uid);
    const groceriesDocRef = doc(firestore, "groceries", logedUser.uid);

    try {
      await setDoc(userDocRef, usuario);
      await setDoc(ingredientsDocRef, { data: [] });
      await setDoc(recipesDocRef, { data: [] });
      await setDoc(scheduleDocRef, { data: [] });
      await setDoc(calendarDocRef, { data: [] });
      await setDoc(groceriesDocRef, { data: [] });
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateUser = async (usuario: IUser) => {
  const docRef = doc(firestore, "users", usuario.uid);
  try {
    await updateDoc(docRef, { ...usuario });
  } catch (error) {
    console.log(error);
  }
};
