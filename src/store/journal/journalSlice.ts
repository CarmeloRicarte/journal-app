import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalNote } from ".";

export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: JournalNote[];
  active: JournalNote | null;
}

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
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
    },
    setNotes: (state, action: PayloadAction<JournalNote[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, action: PayloadAction<JournalNote>) => {},
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
  setSaving,
  updateNote,
} = journalSlice.actions;
