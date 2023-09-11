import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { Box, Container } from "@mui/material";
import Circle from "./components/Circle";
import { useCircleStore } from "../../store";

const JoinedCircles = (): JSX.Element => {
  useLogoutTrigger();
  const { joined } = useCircleStore();
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
          {joined.map((circle) => (
            <Circle key={circle.id} circle={circle} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default JoinedCircles;
