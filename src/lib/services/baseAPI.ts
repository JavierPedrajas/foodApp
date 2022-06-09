import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, getUserDoc } from "lib/services";

export const USERS_API = "users";
export const INGREDIENTS_API = "ingredients";
export const SCHEDULES_API = "schedules";
export const RECIPES_API = "recipes";
export const CALENDARS_API = "calendars";
export const GROCERIES_API = "groceries";

export const getItems = async (APIRef: string) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  try {
    const docRef = doc(firestore, APIRef, userDoc.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData.data;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const addItem = async (APIRef: string, item: any) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const currentItems = await getItems(APIRef);
  if (!currentItems) {
    return;
  }

  currentItems[item.id] = item;

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: currentItems });
    return currentItems;
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (APIRef: string, item: any) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }
  const currentItems = await getItems(APIRef);
  if (!currentItems) {
    return;
  }

  currentItems[item.id] = item;

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: currentItems });
    return currentItems;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (APIRef: string, item: any) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const currentItems = await getItems(APIRef);
  if (!currentItems) {
    return;
  }

  delete currentItems[item.id];

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: currentItems });
    return currentItems;
  } catch (error) {
    console.log(error);
  }
};
