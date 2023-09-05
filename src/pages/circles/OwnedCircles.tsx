import { Box, Container, Fab } from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import AddIcon from "@mui/icons-material/Add";
import Circle from "./components/Circle";
import { useNavigate } from "@tanstack/react-router";
import { useCircleStore } from "../../store";

const OwnedCircles = (): JSX.Element => {
  useLogoutTrigger();
  const navigate = useNavigate();
  const { owned } = useCircleStore();
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
          {owned.map((circle) => (
            <Circle key={circle.id} circle={circle} />
          ))}
        </Box>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => navigate({ to: "/circles/create" })}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
export default OwnedCircles;
