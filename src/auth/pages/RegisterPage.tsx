import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout";

interface FormData {
  displayName: string;
  email: string;
  password: string;
}

const formValidations: {
  [key: string]: [(value: string) => boolean, string];
} = {
  displayName: [(value: string) => value.length > 0, "Full name is required"],
  email: [(value: string) => value.includes("@"), "Email should have an @"],
  password: [
    (value: string) => value.length >= 8,
    "Password should have a minimum of 8 characters",
  ],
};

export const RegisterPage = () => {
  const {
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    formValidation,
  } = useForm<FormData>(
    {
      displayName: "",
      email: "",
      password: "",
    },
    formValidations
  );

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
  };

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              placeholder="Your full name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!formValidation.displayNameValid && formSubmitted}
              helperText={formValidation.displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!formValidation.emailValid && formSubmitted}
              helperText={formValidation.emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!formValidation.passwordValid && formSubmitted}
              helperText={formValidation.passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Sign up
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Have you an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
