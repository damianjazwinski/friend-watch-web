import ApplicationBar from "../../components/app-bar/ApplicationBar";
import "./Home.scss";
import useLogoutTrigger from "../../hooks/logout-trigger";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Watch from "../../components/watch/Watch";

const Home = (): JSX.Element => {
  useLogoutTrigger();
  return (
    <>
      <ApplicationBar />
      <Container maxWidth="xl">
        <Watch
          id={100}
          creatorUsername="Username"
          externalLink="https://youtu.be/dQw4w9WgXcQ"
          createdAt={new Intl.DateTimeFormat("pl-PL", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(new Date())}
          message="Hey I found great yt creator about Minecraft, who wants to watch this with me?"
        />
      </Container>
    </>
  );
};

export default Home;
