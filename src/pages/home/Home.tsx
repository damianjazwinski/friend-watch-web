import ApplicationBar from "../../components/app-bar/ApplicationBar";
import "./Home.scss";
import useLogoutTrigger from "../../hooks/logout-trigger";

const Home = (): JSX.Element => {
  useLogoutTrigger();
  return (
    <>
      <ApplicationBar />
    </>
  );
};

export default Home;
