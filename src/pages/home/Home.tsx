import ApplicationBar from "../../components/app-bar/ApplicationBar";
import "./Home.scss";
import useLogoutTrigger from "../../hooks/logout-trigger";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Watch from "../../components/watch/Watch";
import { useWatchStore } from "../../store";
import { useEffect } from "react";
import { apiGetAllWatches } from "../../api/watches-api";
import { useSnackbar } from "notistack";
import { ErrorResponse } from "../../api/api-tool";

const Home = (): JSX.Element => {
  useLogoutTrigger();
  const { watches, setWatches } = useWatchStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <ApplicationBar />
      <Container maxWidth="xl">
        {watches.length === 0 ? (
          <Typography
            variant="h5"
            component="h5"
            color="grey"
            align="center"
            marginTop={4}
          >
            No watches for now
          </Typography>
        ) : (
          watches.map((watch) => (
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
              circleName={watch.circleName}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Home;
