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
import "./Register.scss";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { apiRegister } from "../../api/auth-api";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorResponse } from "../../api/api-tool";

interface RegisterInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInputs>();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    apiRegister(data.username, data.password, data.confirmPassword)
      .then(async (response) => {
        if (response.status != 200)
          return Promise.reject(await response.json());

        enqueueSnackbar("Registration successful", { variant: "success" });
        navigate({ to: "/login" });
      })
      .catch((error: ErrorResponse) => {
        setError("username", {
          type: "validate",
          message: error.messages.join("\n"),
        });
      });
  };

  return (
    <>
      <div className="register-page">
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
              Sign up
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm password"
                    type="password"
                    id="confirmPassword"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Password confirmation is required",
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Sign in
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

export default Register;
