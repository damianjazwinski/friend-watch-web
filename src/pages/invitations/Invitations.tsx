import { Container, CssBaseline } from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";

const Invitations = (): JSX.Element => {
  useLogoutTrigger();
  return (
    <>
      <ApplicationBar />
      <CssBaseline />
      <Container maxWidth={"xl"}></Container>
    </>
  );
};
export default Invitations;
