import { useParams, warning } from "@tanstack/react-router";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import Watch from "../../components/watch/Watch";
import { apiCreateWatch, apiGetAllWatches } from "../../api/watches-api";
import { ErrorResponse } from "../../api/api-tool";
import { useWatchStore } from "../../store";
import { useSnackbar } from "notistack";

interface CreateWatchInputs {
  message: string;
  externalLink: string;
}

const Watches = (): JSX.Element => {
  useLogoutTrigger();
  const { enqueueSnackbar } = useSnackbar();
  const circleId = Number.parseInt(useParams().circleId!);
  const { watches, setWatches } = useWatchStore();

  const watchesForCircle = watches.filter(
    (watch) => watch.circleId === circleId
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CreateWatchInputs>();

  const onSubmit: SubmitHandler<CreateWatchInputs> = (data) => {
    apiCreateWatch(circleId, data.message, data.externalLink)
      .then(() => {
        reset();
        apiGetAllWatches()
          .then(({ watches }) => {
            setWatches(watches);
          })
          .catch((error: ErrorResponse) => {
            enqueueSnackbar({
              message: error.messages.join("\n"),
              variant: "error",
            });
          });
      })
      .catch((error: ErrorResponse) => {
        setError("message", {
          type: "validate",
          message: error.messages.join("\n"),
        });
      });
  };

  return (
    <>
      <ApplicationBar />
      <Container maxWidth="xl">
        <Paper
          square
          elevation={3}
          sx={{ margin: "16px 0", padding: "16px" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box flexGrow={1} display={"flex"} flexDirection={"column"} gap={1}>
            <TextField
              label="Watch message"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              error={!!errors.message}
              helperText={errors.message?.message}
              {...register("message", {
                required: "Watch message is required",
              })}
            />
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <TextField
                label="External link"
                variant="outlined"
                fullWidth
                error={!!errors.externalLink}
                helperText={errors.externalLink?.message}
                {...register("externalLink")}
              />
              <Button
                type="submit"
                variant={"contained"}
                sx={{ width: "200px" }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Paper>

        {watchesForCircle.length === 0 ? (
          <Typography
            variant="h5"
            component="h5"
            color="grey"
            align="center"
            marginTop={4}
          >
            No watches for this circle
          </Typography>
        ) : (
          watchesForCircle.map((watch) => (
            <Watch
              key={watch.watchId}
              id={watch.watchId}
              creatorUsername={watch.creatorName}
              externalLink={watch.externalLink}
              createdAt={new Intl.DateTimeFormat("pl-PL", {
                dateStyle: "short",
                timeStyle: "medium",
              }).format(new Date(watch.createdAt))}
              message={watch.message}
              comments={watch.comments}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Watches;
