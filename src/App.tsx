import { ThemeProvider } from "@mui/material";
import "./App.css";
import RouterProvider from "./Router";
import { appTheme } from "./theme";
import { useEffect } from "react";
import { useCircleStore, useUserStore } from "./store";
import { apiGetUser } from "./api/user-api";
import { ErrorResponse } from "./api/api-tool";
import { enqueueSnackbar } from "notistack";
import { apiGetOwnedCircles } from "./api/circles-api";

function App() {
  const { isLoggedIn, setUserData, logout } = useUserStore();
  const { setOwned } = useCircleStore();
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

      // fetch owned circles
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
