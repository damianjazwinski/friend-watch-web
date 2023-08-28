import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import "./Login.scss";
import { useUserStore } from "../../store";
import { useNavigate } from "@tanstack/react-router";
import { apiLogin } from "../../api/auth-api";
import { ErrorResponse } from "../../api/api-tool";
import { useForm, SubmitHandler } from "react-hook-form"; // TODO: add this, and snackbar
import { useSnackbar } from "notistack";

interface LoginInputs {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>();

  const { login } = useUserStore();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    apiLogin(data.username, data.password)
      .then(async (response) => {
        if (response.status != 200)
          return Promise.reject(await response.json());

        localStorage["tokenExpirations"] = JSON.stringify(
          await response.json()
        );
        login();
        navigate({ to: "/" });
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar({
          message: error.messages.join("\n"),
          variant: "success",
        });
        reset();
      });
  };

  return (
    <>
      <div className="login-page">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
