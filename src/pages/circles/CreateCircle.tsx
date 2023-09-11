import { useState } from "react";
import { v4 } from "uuid";
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

import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { apiCreateCircle, apiGetOwnedCircles } from "../../api/circles-api";
import { ErrorResponse } from "../../api/api-tool";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "@tanstack/react-router";
import { ICircle } from "../../types";
import { useCircleStore } from "../../store";

interface CreateCircleInputs {
  name: string;
  circleImage: FileList;
}

const CreateCircle = (): JSX.Element => {
  useLogoutTrigger();
  const [pictureName, setPictureName] = useState("Add circle picture");
  const { owned, setOwned } = useCircleStore();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateCircleInputs>();

  const onChange: ChangeHandler = async (event) => {
    setPictureName(event.target.files[0].name);
  };

  const onSubmit: SubmitHandler<CreateCircleInputs> = (data) => {
    apiCreateCircle(data.name, data.circleImage[0])
      .then(() => {
        const newCircle: ICircle = {
          id: v4(),
          imageFile: {
            url: data.circleImage[0]
              ? URL.createObjectURL(data.circleImage[0])
              : "/circle_card_photo.png",
          },
          name: data.name,
        };
        setOwned([...owned, newCircle]);

        enqueueSnackbar("Circle created", { variant: "success" });
        apiGetOwnedCircles()
          .then((response) => {
            setOwned(response.ownedCircles);
          })
          .catch((error: ErrorResponse) => {
            enqueueSnackbar({
              message: error.messages.join("\n"),
              variant: "error",
            });
          });
        navigate({ to: "/circles/owned" });
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
