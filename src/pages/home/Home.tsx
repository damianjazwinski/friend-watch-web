import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import HomeIcon from "@mui/icons-material/Home";
import "./Home.scss";
import useLogoutTrigger from "../../hooks/logout-trigger";

const Home = (): JSX.Element => {
  useLogoutTrigger();
  return (
    <>
      <ApplicationBar />
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography color="text.primary">Home</Typography>
          </Link>
        </Breadcrumbs>
      </Container>
    </>
  );
};

export default Home;
