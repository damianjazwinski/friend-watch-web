import { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";

import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { apiCreateCircle } from "../../api/circles-api";
import { ErrorResponse } from "../../api/api-tool";
import { PhotoCamera } from "@mui/icons-material";

interface CreateCircleInputs {
  name: string;
  circleImage: FileList;
}

const CreateCircle = (): JSX.Element => {
  useLogoutTrigger();
  const [pictureName, setPictureName] = useState("Add circle picture");
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateCircleInputs>();

  const onChange: ChangeHandler = async (event) => {
    console.log(event);
    setPictureName(event.target.files[0].name);
  };

  const onSubmit: SubmitHandler<CreateCircleInputs> = (data) => {
    apiCreateCircle(data.name, data.circleImage[0])
      .then(async (response) => {
        console.log(response);
        if (!response.ok) return Promise.reject(await response.json());

        enqueueSnackbar("Circle created", { variant: "success" });
      })
      .catch((error: ErrorResponse) => {
        setError("name", {
          type: "validate",
          message: error.messages.join("\n"),
        });
      });
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
              startIcon={<PhotoCamera />}
              fullWidth
              component="label"
              variant="contained"
              aria-label="upload picture"
              sx={{ mt: 3 }}
            >
              <input
                multiple={false}
                hidden
                accept="image/*"
                type="file"
                id="circleImage"
                {...register("circleImage", { onChange: onChange })}
              />
              {pictureName}
            </Button>
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
