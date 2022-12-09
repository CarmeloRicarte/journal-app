import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalNote } from ".";

export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: JournalNote[];
  active: JournalNote;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: {} as JournalNote,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<JournalNote>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<JournalNote>) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action: PayloadAction<JournalNote[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action: PayloadAction<JournalNote>) => {
      state.isSaving = false;
      const { id, title, body, date, imageUrls } = action.payload;
      const noteToUpdate = state.notes.find((note) => note.id === id);
      if (noteToUpdate) {
        noteToUpdate.title = title;
        noteToUpdate.body = body;
        noteToUpdate.date = date;
        noteToUpdate.imageUrls = imageUrls;
      }
      state.messageSaved = `${action.payload.title} has been updated!`;
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    deleteNodeById: (state, action: PayloadAction<string>) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  deleteNodeById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
