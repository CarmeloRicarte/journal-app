import { NoteAddOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      className="animate__animated animate__fadeIn"
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 110px)",
        backgroundColor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <NoteAddOutlined sx={{ fontSize: 100, color: "white" }} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" color="white">
          Select or create an entry
        </Typography>
      </Grid>
    </Grid>
  );
};
