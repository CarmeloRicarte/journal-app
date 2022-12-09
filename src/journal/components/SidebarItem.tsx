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

export const SidebarItem = ({ title, body, id }: JournalNote) => {
  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );
  return (
    <ListItem key={id} disablePadding>
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
