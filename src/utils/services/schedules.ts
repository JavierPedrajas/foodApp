import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ISchedule } from "utils/interfaces";
import { firestore, getUserDoc } from "utils/services";

const APIRef = "schedule";

export const getSchedules = async () => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  try {
    const docRef = doc(firestore, APIRef, userDoc.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData.data as ISchedule[];
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {}
};

export const addSchedule = async (schedule: ISchedule) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const currentSchedules = await getSchedules();
  if (!currentSchedules) {
    return;
  }

  currentSchedules.push(schedule);

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: [...currentSchedules] });
  } catch (error) {
    console.log(error);
  }
};

export const updateSchedule = async (schedule: ISchedule) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }
  const currentSchedules = await getSchedules();
  if (!currentSchedules) {
    return;
  }

  const updateIndex = currentSchedules.findIndex(
    (ings) => ings.id === schedule.id
  );
  currentSchedules[updateIndex] = schedule;

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: [...currentSchedules] });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSchedules = async (schedule: ISchedule) => {
  const userDoc = await getUserDoc();
  if (!userDoc) {
    return;
  }

  const currentSchedule = await getSchedules();
  if (!currentSchedule) {
    return;
  }

  const removeIndex = currentSchedule.findIndex(
    (ings) => ings.id === schedule.id
  );
  currentSchedule.splice(removeIndex, 1);

  const docRef = doc(firestore, APIRef, userDoc.uid);

  try {
    await updateDoc(docRef, { data: [...currentSchedule] });
  } catch (error) {
    console.log(error);
  }
};
