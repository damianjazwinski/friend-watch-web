import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { Box, Container } from "@mui/material";
import Circle from "./components/Circle";

const JoinedCircles = (): JSX.Element => {
  useLogoutTrigger();
  return (
    <>
      <ApplicationBar />
      <Container maxWidth={false}>
        <Box
          component="div"
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: "1em",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Circle />
          <Circle />
          <Circle />
        </Box>
      </Container>
    </>
  );
};

export default JoinedCircles;
