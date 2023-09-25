import ApplicationBar from "../../components/app-bar/ApplicationBar";
import "./Home.scss";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { Container, Typography } from "@mui/material";
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
              creatorAvatarUrl={watch.creatorAvatarUrl}
              externalLink={watch.externalLink}
              expirationDate={watch.expirationDate}
              createdAt={watch.createdAt}
              message={watch.message}
              circleName={watch.circleName}
              comments={watch.comments}
            />
          ))
        )}
      </Container>
    </>
  );
};

export default Home;
