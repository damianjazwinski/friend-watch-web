import { useNavigate } from "@tanstack/react-router";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./Circles.scss";

const Circles = (): JSX.Element => {
  useLogoutTrigger();
  const navigate = useNavigate();
  const breadcrumbsHomehandler = () => navigate({ to: "/" });
  return (
    <>
      <ApplicationBar />
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          onClick={breadcrumbsHomehandler}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Circles</Typography>
      </Breadcrumbs>

      <Container maxWidth="xl" sx={{ border: "1px solid black" }}>
        <Box
          component="div"
          sx={{
            border: "1px solid black",
            display: "inline-flex",
            flexDirection: "row",
            gap: "2em",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="circle_card_photo.png"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Circle name 1
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
              <Button size="small">View members</Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="circle_card_photo.png"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Circle name 1
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
              <Button size="small">View members</Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="circle_card_photo.png"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Circle name 1
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
              <Button size="small">View members</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Circles;
