import { ThemeProvider } from "@mui/material";
import "./App.css";
import RouterProvider from "./Router";
import { appTheme } from "./theme";
import { useEffect } from "react";
import { useUserStore } from "./store";
import { apiGetUser } from "./api/user-api";
import { ErrorResponse } from "./api/api-tool";
import { enqueueSnackbar } from "notistack";

function App() {
  const { isLoggedIn, setUserData, logout } = useUserStore();
  useEffect(() => {
    if (isLoggedIn) {
      apiGetUser()
        .then(({ id, username }) => {
          setUserData(id, username);
        })
        .catch((error: ErrorResponse) => {
          console.log(error);
          enqueueSnackbar({
            message: error.messages.join("\n"),
            variant: "error",
          });
          logout();
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
