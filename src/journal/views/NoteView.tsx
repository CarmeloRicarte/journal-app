import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ImageGallery } from "../components";
import { setActiveNote, startSavingNote } from "../../store/journal";

export const NoteView = () => {
  const dispatch = useAppDispatch();
  const {
    active: activeNote,
    messageSaved,
    isSaving,
  } = useAppSelector((state) => state.journal);
  const {} = useAppSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  const dateFormatted = useMemo(() => {
    const dateString = date
      ? new Date(date).toDateString()
      : new Date().toDateString();
    return dateString;
  }, [date]);

  const fileInputRef = useRef<HTMLInputElement>(null); // reference of hidden input field for upload images

  /* A hook that is called after every render. It is used to update the state of the active not when every element of form changes. */
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Note updated!", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length === 0) return;
    // dispatch
  };

  return (
    <Grid
      container
      className="animate__animated animate__fadeIn"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateFormatted}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadFileOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          type="button"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Insert a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
