import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import "./Circles.scss";
import AddIcon from "@mui/icons-material/Add";

const Circles = (): JSX.Element => {
  useLogoutTrigger();
  return (
    <>
      <ApplicationBar />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: "1em",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button>
            <Card sx={{ width: 300 }}>
              <CardMedia
                sx={{
                  height: 150,
                  display: "grid",
                  placeItems: "center",
                  padding: "0.5em",
                }}
                image="circle_card_photo.png"
                title="green iguana"
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textTransform: "none", fontWeight: 1000, fontSize: 41 }}
                >
                  Buddies
                </Typography>
              </CardMedia>
            </Card>
          </Button>
          <Button>
            <Card
              sx={{
                width: 300,
                height: 185,
                display: "grid",
                placeItems: "center",
                padding: "0.5em",
              }}
            >
              <CardMedia
                sx={{
                  width: "100%",
                  height: "100%",
                  filter: "blur(3px)",
                  scale: "1.1",
                  gridRow: "1/2",
                  gridColumn: "1/2",
                }}
                image="biznes-ludzie-grupa-ludzi.jpg"
              ></CardMedia>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: 1000,
                  fontSize: 41,
                  alignSelf: "end",
                  gridRow: "1/2",
                  gridColumn: "1/2",
                  zIndex: 1,
                }}
              >
                Buddies
              </Typography>
            </Card>
          </Button>
          <Button>
            <Box></Box>
            <Card
              sx={{
                width: 300,
                height: 185,
                display: "grid",
                placeItems: "center",
                padding: "0.5em",
              }}
            >
              <AddIcon fontSize="large" />
            </Card>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Circles;
