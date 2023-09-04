import { Container, Fab } from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import AddIcon from "@mui/icons-material/Add";
import Circle from "./components/Circle";
import { useNavigate } from "@tanstack/react-router";

const OwnedCircles = (): JSX.Element => {
  useLogoutTrigger();
  const navigate = useNavigate();
  return (
    <>
      <ApplicationBar />
      <Container maxWidth={false}>
        <Circle />
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
