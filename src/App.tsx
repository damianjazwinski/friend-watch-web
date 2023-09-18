import { ThemeProvider } from "@mui/material";
import "./App.css";
import RouterProvider from "./Router";
import { appTheme } from "./theme";
import { useEffect } from "react";
import {
  useCircleStore,
  useInvitationStore,
  useUserStore,
  useWatchStore,
} from "./store";
import { apiGetUser } from "./api/user-api";
import { ErrorResponse } from "./api/api-tool";
import { enqueueSnackbar } from "notistack";
import { apiGetJoinedCircles, apiGetOwnedCircles } from "./api/circles-api";
import { apiGetInvitations } from "./api/invitation-api";
import { apiGetAllWatches } from "./api/watches-api";

function App() {
  const { isLoggedIn, setUserData, logout } = useUserStore();
  const { setOwned, setJoined } = useCircleStore();
  const { setSent, setReceived } = useInvitationStore();
  const { setWatches } = useWatchStore();

  useEffect(() => {
    if (isLoggedIn) {
      apiGetUser()
        .then(({ id, username }) => {
          setUserData(id, username);
        })
        .catch((error: ErrorResponse) => {
          enqueueSnackbar({
            message: error.messages.join("\n"),
            variant: "error",
          });
          logout();
        });

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

      apiGetJoinedCircles()
        .then(({ joinedCircles }) => {
          setJoined(joinedCircles);
        })
        .catch((error: ErrorResponse) => {
          enqueueSnackbar({
            message: error.messages.join("\n"),
            variant: "error",
          });
        });

      apiGetInvitations()
        .then(({ sentInvitations, receivedInvitations }) => {
          setSent(sentInvitations);
          setReceived(receivedInvitations);
        })
        .catch((error: ErrorResponse) => {
          enqueueSnackbar({
            message: error.messages.join("\n"),
            variant: "error",
          });
        });

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
    }
  }, [isLoggedIn]);
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <RouterProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
