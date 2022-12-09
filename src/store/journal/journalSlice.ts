import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalNote } from ".";

export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: JournalNote[];
  active: JournalNote | null;
}

const initialState: JournalState = {
  isSaving: true,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<JournalNote>) => {},
    setActiveNote: (state, action: PayloadAction<JournalNote>) => {},
    setNotes: (state, action: PayloadAction<JournalNote[]>) => {},
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
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNodeById,
} = journalSlice.actions;
