import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components";

type JournalLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const drawerWidth = 280;

export const JournalLayout = ({ children }: JournalLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar drawerWidth */}
      <Navbar drawerWidth={drawerWidth} />
      {/* Sidebar drawerWidth */}
      <Sidebar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
