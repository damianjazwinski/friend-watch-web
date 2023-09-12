import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import useLogoutTrigger from "../../../hooks/logout-trigger";
import ApplicationBar from "../../../components/app-bar/ApplicationBar";
import {
  Avatar,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useCircleStore } from "../../../store";
import { useSnackbar } from "notistack";
import { ErrorResponse } from "../../../api/api-tool";
import { apiGetJoinedCircle } from "../../../api/circles-api";

const JoinedCircle = (): JSX.Element => {
  useLogoutTrigger();
  const { joined, addMembersToJoinedCircle } = useCircleStore();
  const { enqueueSnackbar } = useSnackbar();
  const circleId = Number.parseInt(useParams().circleId!);

  useEffect(() => {
    apiGetJoinedCircle(circleId!)
      .then(({ circle }) => {
        addMembersToJoinedCircle(circle);
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar(error.messages.join("\n"), { variant: "error" });
      });
  }, []);

  const circle = joined.find((circleElement) => circleElement.id === circleId);
  if (circle === undefined) return <></>;

  return (
    <>
      <ApplicationBar />
      <CssBaseline />
      <Container maxWidth={"xl"}>
        <Typography
          variant="h4"
          component="h4"
          margin={1}
          flexGrow={1}
          alignContent={"center"}
          alignSelf={"center"}
        >
          {circle.name}
        </Typography>

        <List sx={{ width: "100%" }}>
          {circle.members?.map((member, index) => {
            const labelId = `member-list-${member.id}`;
            return (
              <Paper square elevation={2} key={member.id}>
                <ListItem
                  key={member.id}
                  disablePadding
                  sx={{
                    mb: index !== circle.members!.length - 1 ? 1 : 0,
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

export default JoinedCircle;
