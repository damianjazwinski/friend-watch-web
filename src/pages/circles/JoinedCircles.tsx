import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { Box, Container, Typography } from "@mui/material";
import Circle from "./components/Circle";
import { useCircleStore } from "../../store";
import { useNavigate } from "@tanstack/react-router";

const JoinedCircles = (): JSX.Element => {
  useLogoutTrigger();
  const { joined } = useCircleStore();
  const navigate = useNavigate();

  return (
    <>
      <ApplicationBar />
      <Container maxWidth={false}>
        <Typography variant="h4" gutterBottom>
          Joined
        </Typography>
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
            <Circle
              key={circle.id}
              circle={circle}
              onClick={() => navigate({ to: `/circles/joined/${circle.id}` })}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default JoinedCircles;
