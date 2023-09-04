import { blue, grey, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#2A514D",
    },
    background: {
      default: "#eaeeed",
    },
  },
  typography: {
    fontFamily: "Nunito Sans",
  },
});
