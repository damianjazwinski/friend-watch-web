import { Box, Typography } from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";

const NotFound = (): JSX.Element => {
  return (
    <>
      <ApplicationBar />
      <Box>
        <Typography variant="h5" component="h5">
          Strona nie została odnaleziona
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
