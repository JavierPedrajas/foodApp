import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from ".";
import { IUser } from "lib/interfaces/user";
import {
  CALENDARS_API,
  GROCERIES_API,
  INGREDIENTS_API,
  RECIPES_API,
  SCHEDULES_API,
  USERS_API,
} from "lib/services/baseAPI";

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
    const docRef = doc(firestore, USERS_API, logedUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
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
    const userDocRef = doc(firestore, USERS_API, logedUser.uid);
    const ingredientsDocRef = doc(firestore, INGREDIENTS_API, logedUser.uid);
    const recipesDocRef = doc(firestore, RECIPES_API, logedUser.uid);
    const schedulesDocRef = doc(firestore, SCHEDULES_API, logedUser.uid);
    const calendarsDocRef = doc(firestore, CALENDARS_API, logedUser.uid);
    const groceriesDocRef = doc(firestore, GROCERIES_API, logedUser.uid);

    try {
      await setDoc(userDocRef, usuario);
      await setDoc(ingredientsDocRef, { data: {} });
      await setDoc(recipesDocRef, { data: {} });
      await setDoc(schedulesDocRef, { data: {} });
      await setDoc(calendarsDocRef, { data: {} });
      await setDoc(groceriesDocRef, { data: {} });
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateUser = async (usuario: IUser) => {
  const docRef = doc(firestore, USERS_API, usuario.uid);
  try {
    await updateDoc(docRef, { ...usuario });
  } catch (error) {
    console.log(error);
  }
};
