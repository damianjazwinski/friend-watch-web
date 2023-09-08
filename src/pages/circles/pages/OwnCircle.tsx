import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ApplicationBar from "../../../components/app-bar/ApplicationBar";
import { useParams } from "@tanstack/react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { apiGetOwnedCircle } from "../../../api/circles-api";
import { useCircleStore } from "../../../store";
import { ErrorResponse } from "../../../api/api-tool";
import { useSnackbar } from "notistack";

const OwnCircle = (): JSX.Element => {
  const { circleId } = useParams();
  const { circleWithMembers, setCircleWithMembers } = useCircleStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    apiGetOwnedCircle(circleId!)
      .then(({ circle }) => {
        setCircleWithMembers(circle);
        console.log(circle.members);
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar(error.messages.join("\n"), { variant: "error" });
      });
  }, []);

  return (
    <>
      <ApplicationBar />
      <CssBaseline />
      <Container maxWidth={"xl"}>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography
            variant="h4"
            component="h4"
            margin={1}
            flexGrow={1}
            alignContent={"center"}
            alignSelf={"center"}
          >
            {circleWithMembers.name}
          </Typography>
          <Box paddingTop={1} paddingBottom={1}>
            <Button variant="contained">Create invtation link</Button>
          </Box>
        </Box>
        <Divider />
        <List sx={{ width: "100%" }}>
          {circleWithMembers.members?.map((member, index) => {
            const labelId = `member-list-${member.id}`;
            return (
              <Paper square elevation={2} key={member.id}>
                <ListItem
                  key={member.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" sx={{ mr: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                  sx={{
                    mb: index !== circleWithMembers.members!.length - 1 ? 1 : 0,
                  }}
                >
                  <ListItemButton disableRipple>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar member`} src="/2.png" />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`${member.username}`}
                      secondary={`ID: ${member.id}`}
                    />
                  </ListItemButton>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default OwnCircle;
