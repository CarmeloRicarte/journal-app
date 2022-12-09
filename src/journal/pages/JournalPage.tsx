import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views";
import { NoteView } from "../views";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector((state) => state.journal);
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {Object.keys(active).length > 0 ? (
        <NoteView />
      ) : (
        <>
          <NothingSelectedView />
          <Fab
            disabled={isSaving}
            onClick={onClickNewNote}
            color="error"
            aria-label="add"
            sx={{ position: "fixed", right: 50, bottom: 10 }}
          >
            <Add />
          </Fab>
        </>
      )}
    </JournalLayout>
  );
};
