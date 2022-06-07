import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IIngredient } from "utils/interfaces";
import { firestore, getUserDoc } from "utils/services";

const APIRef = "ingredients";

export const getIngredients = async () => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  try {
    const docRef = doc(firestore, APIRef, userDoc.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData.data as IIngredient[];
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

  currentIngredients.push(ingredient);

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: [...currentIngredients] });
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

  const updateIndex = currentIngredients.findIndex(
    (ings) => ings.id === ingredient.id
  );
  currentIngredients[updateIndex] = ingredient;

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: [...currentIngredients] });
  } catch (error) {
    console.log(error);
  }
};

export const deleteIngredient = async (ingredient: IIngredient) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const currentIngredients = await getIngredients();
  if (!currentIngredients) {
    return;
  }

  const removeIndex = currentIngredients.findIndex(
    (ings) => ings.id === ingredient.id
  );
  currentIngredients.splice(removeIndex, 1);

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: [...currentIngredients] });
  } catch (error) {
    console.log(error);
  }
};
