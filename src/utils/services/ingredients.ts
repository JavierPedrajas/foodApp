import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { IIngredient, IIngredientList } from "utils/interfaces";
import { firestore, getUserDoc } from "utils/services";

export const getIngredients = async () => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  try {
    const docRef = doc(firestore, "ingredients", userDoc.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data() as IIngredientList;
      return docData;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {}
};

export const addIngredient = async (ingredient: IIngredient) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const currentIngredients = await getIngredients();
  if (!currentIngredients) {
    return;
  }

  currentIngredients.data.push(ingredient);

  const docRef = doc(firestore, "ingredients", userDoc.uid);

  try {
    await updateDoc(docRef, { data: currentIngredients });
  } catch (error) {
    console.log(error);
  }
};

export const updateIngredient = async (ingredient: IIngredient) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }
  const currentIngredients = await getIngredients();
  if (!currentIngredients) {
    return;
  }

  const updateIndex = currentIngredients.data.findIndex(
    (ings) => ings.id === ingredient.id
  );
  currentIngredients.data[updateIndex] = ingredient;

  const docRef = doc(firestore, "ingredients", userDoc.uid);

  try {
    await updateDoc(docRef, { data: currentIngredients });
  } catch (error) {
    console.log(error);
  }
};

export const deleteIngredient = async (ingredient: IIngredient) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const docRef = doc(firestore, "ingredients", userDoc.uid);

  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};
