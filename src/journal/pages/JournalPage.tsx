import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views";
import { NoteView } from "../views";
export const JournalPage = () => {
  return (
    <JournalLayout>
      {/*<NothingSelectedView />*/}
      <NoteView />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: 50, bottom: 10 }}
      >
        <Add />
      </Fab>
    </JournalLayout>
  );
};
