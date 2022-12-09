import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { JournalNote } from "../../store/journal";
export const loadNotes = async (uid: string): Promise<JournalNote[]> => {
  if (!uid) throw new Error("The UID of user doesn't exists");

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: JournalNote[] = [];
  docs.forEach((doc) => {
    notes.push({
      id: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      date: doc.data().date,
      imageUrls: doc.data().imageUrls,
    });
  });
  return notes;
};
