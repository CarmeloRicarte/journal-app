import { Box } from "@mui/material";
import { Navbar } from "../components";

type JournalLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const drawerWidth = 240;

export const JournalLayout = ({ children }: JournalLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar drawerWidth */}
      <Navbar drawerWidth={drawerWidth} />
      {/* Sidebar drawerWidth */}

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        {/* Toolbar */}
        {children}
      </Box>
    </Box>
  );
};
