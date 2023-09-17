import { useParams } from "@tanstack/react-router";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { ChangeHandler, SubmitHandler, useForm } from "react-hook-form";
import Watch from "../../components/watch/Watch";
import { apiCreateWatch } from "../../api/watches-api";
import { ErrorResponse } from "../../api/api-tool";

interface CreateWatchInputs {
  message: string;
  externalLink: string;
}

const Watches = (): JSX.Element => {
  useLogoutTrigger();
  const circleId = Number.parseInt(useParams().circleId!);

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
        console.log("wykonano");
        reset();
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
              <TextField label="External link" variant="outlined" fullWidth />
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
        <Watch
          id={100}
          creatorUsername="Username"
          externalLink="https://youtu.be/dQw4w9WgXcQ"
          createdAt={new Intl.DateTimeFormat("pl-PL", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(new Date())}
          message="Hey I found great yt creator about Minecraft, who wants to watch this with me?"
        />
      </Container>
    </>
  );
};

export default Watches;
