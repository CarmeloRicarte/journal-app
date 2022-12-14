import { useMemo } from "react";
import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AuthLayout } from "../layout";
import { AUTH_STATUS } from "../../store/auth/authSlice";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);

  const { formState, email, password, onInputChange } = useForm(formData);

  /* A memoized value that is only updated when the status changes. */
  const isAuthenticating = useMemo(
    () => status === AUTH_STATUS.CHECKING,
    [status]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(formState));
  };

  const onGoogleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              inputProps={{
                "data-testid": "password-input",
              }}
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            display={!!errorMessage ? "" : "none"}
            sx={{ mt: 2 }}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
                aria-label="sign-in-btn"
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="button"
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
                aria-label="google-btn"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
