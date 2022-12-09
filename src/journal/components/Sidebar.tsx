import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { SidebarItem } from "./SidebarItem";

type SidebarProps = {
  drawerWidth: number;
};
export const Sidebar = ({ drawerWidth }: SidebarProps) => {
  const { displayName } = useAppSelector((state) => state.auth);
  const { notes } = useAppSelector((state) => state.journal);
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SidebarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
