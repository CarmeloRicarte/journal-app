import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from ".";
import { FirebaseDB } from "../../firebase";
import { store } from "../store";
import { fileUpload, loadNotes } from "../../journal/helpers";

export const startNewNote = createAsyncThunk("notes/startNewNote", async () => {
  store.dispatch(savingNewNote());
  // uid
  const { uid } = store.getState().auth;

  const newNote = {
    id: "",
    title: "",
    body: "",
    date: new Date().getTime(),
    imageUrls: [],
  };

  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
  await setDoc(newDoc, newNote);

  newNote.id = newDoc.id;
  //dispatch
  store.dispatch(addNewEmptyNote(newNote));
  store.dispatch(setActiveNote(newNote));
});

export const startLoadingNotes = createAsyncThunk(
  "notes/startLoadingNotes",
  async () => {
    const { uid } = store.getState().auth;
    if (!uid) throw new Error("The UID of user doesn't exists");
    const notes = await loadNotes(uid);
    store.dispatch(setNotes(notes));
  }
);

export const startSavingNote = createAsyncThunk(
  "notes/startSavingNote",
  async () => {
    store.dispatch(setSaving());

    const { uid } = store.getState().auth;
    const { active: note } = store.getState().journal;

    const noteToFirestore = {
      title: note.title,
      body: note.body,
      date: note.date,
      imageUrls: note.imageUrls,
    };

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    store.dispatch(updateNote(note));
  }
);

export const startUploadingFiles = createAsyncThunk(
  "notes/startUploadingFiles",
  async (files: FileList) => {
    store.dispatch(setSaving());

    // upload all files simultaneously
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    store.dispatch(setPhotosToActiveNote(photosUrls));
  }
);

export const startDeletingNote = createAsyncThunk(
  "notes/startDeletingNote",
  async () => {
    const { uid } = store.getState().auth;
    const { active: note } = store.getState().journal;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    store.dispatch(deleteNoteById(note.id));
  }
);
