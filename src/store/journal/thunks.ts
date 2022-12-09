import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from ".";
import { FirebaseDB } from "../../firebase";
import { store } from "../store";

export const startNewNote = createAsyncThunk("notes/startNewNote", async () => {
  store.dispatch(savingNewNote());
  // uid
  const { uid } = store.getState().auth;

  const newNote = {
    id: "",
    title: "",
    body: "",
    date: new Date().getTime(),
  };

  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
  await setDoc(newDoc, newNote);

  newNote.id = newDoc.id;
  //dispatch
  store.dispatch(addNewEmptyNote(newNote));
  store.dispatch(setActiveNote(newNote));
});
