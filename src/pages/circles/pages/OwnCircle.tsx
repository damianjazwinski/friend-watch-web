import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ApplicationBar from "../../../components/app-bar/ApplicationBar";
import { useParams } from "@tanstack/react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect } from "react";
import { apiGetOwnedCircle } from "../../../api/circles-api";
import { useCircleStore, useInvitationStore } from "../../../store";
import { ErrorResponse } from "../../../api/api-tool";
import { useSnackbar } from "notistack";
import {
  apiCreateInvitation,
  apiGetInvitations,
} from "../../../api/invitation-api";
import { SubmitHandler, useForm } from "react-hook-form";
import useLogoutTrigger from "../../../hooks/logout-trigger";

const OwnCircle = (): JSX.Element => {
  useLogoutTrigger();
  const { circleId } = useParams();
  const { circleWithMembers, setCircleWithMembers } = useCircleStore();
  const { setSent, setReceived } = useInvitationStore();
  const { enqueueSnackbar } = useSnackbar();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>();

  useEffect(() => {
    apiGetOwnedCircle(circleId!)
      .then(({ circle }) => {
        setCircleWithMembers(circle);
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar(error.messages.join("\n"), { variant: "error" });
      });
  }, []);

  const onSubmit: SubmitHandler<{ username: string }> = (data) => {
    reset();
    apiCreateInvitation(Number.parseInt(circleId!), data.username)
      .then(() => {
        apiGetInvitations()
          .then(({ sentInvitations, receivedInvitations }) => {
            setSent(sentInvitations);
            setReceived(receivedInvitations);
          })
          .catch((error: ErrorResponse) => {
            enqueueSnackbar({
              message: error.messages.join("\n"),
              variant: "error",
            });
          });
        enqueueSnackbar("Invitation send", { variant: "success" });
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar(error.messages.join("\n"), { variant: "error" });
      });
  };

  return (
    <>
      <ApplicationBar />
      <CssBaseline />
      <Container maxWidth={"xl"}>
        <Box display={"flex"} flexDirection={"row"} marginBottom={4}>
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

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Invite user"
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    edge="end"
                    sx={{ marginRight: "1px" }}
                  >
                    <PersonAddIcon />
                  </IconButton>
                ),
              }}
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register("username", {
                required: "Username is required",
              })}
            />
          </Box>
        </Box>
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
