import { CssBaseline } from "@mui/material";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import "./Home.scss";
import { useEffect } from "react";
import { forbiddenPing } from "../../api/auth-api";
import useLogoutTrigger from "../../hooks/logout-trigger";

const Home = (): JSX.Element => {
  useLogoutTrigger();

  useEffect(() => {
    forbiddenPing().catch(() => {
      localStorage.removeItem("tokenExpirations");
    });
  }, []);
  return (
    <>
      <CssBaseline />
      <ApplicationBar />
    </>
  );
};

export default Home;
