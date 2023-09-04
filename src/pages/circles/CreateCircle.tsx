import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

interface CreateCircleInputs {
  name: string;
}

const CreateCircle = (): JSX.Element => {
  useLogoutTrigger();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCircleInputs>();
  const onSubmit: SubmitHandler<CreateCircleInputs> = (data) => {
    console.log(data.name);
    enqueueSnackbar("Circle created", { variant: "success" });
  };
  return (
    <>
      <ApplicationBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          minWidth={300}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create new circle
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <TextField
              fullWidth
              label="Circle name"
              type="text"
              id="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Circle name is required",
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateCircle;
