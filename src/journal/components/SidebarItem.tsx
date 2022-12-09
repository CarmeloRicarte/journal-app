import { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import { JournalNote } from "../../store/journal/journal.types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setActiveNote } from "../../store/journal";

export const SidebarItem = ({
  title,
  body,
  id,
  date,
  imageUrls = [],
}: JournalNote) => {
  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );

  const dispatch = useAppDispatch();
  const onClickNote = (note: JournalNote) => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem
      key={id}
      disablePadding
      onClick={() => onClickNote({ title, body, id, date, imageUrls })}
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText primary={newTitle} />
          </Grid>
          <Grid item xs={12}>
            <ListItemText secondary={body} />
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
