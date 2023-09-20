import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ApplicationBar from "../../components/app-bar/ApplicationBar";
import useLogoutTrigger from "../../hooks/logout-trigger";
import { useCircleStore, useInvitationStore, useWatchStore } from "../../store";
import InvitationCard from "./components/InvitationCard";
import { useEffect, useState } from "react";
import {
  apiGetInvitations,
  apiReplyInvitation,
} from "../../api/invitation-api";
import { useSnackbar } from "notistack";
import { ErrorResponse } from "../../api/api-tool";
import { apiGetJoinedCircles } from "../../api/circles-api";
import { apiGetAllWatches } from "../../api/watches-api";

const Invitations = (): JSX.Element => {
  useLogoutTrigger();
  const { sent, received, setSent, setReceived } = useInvitationStore();
  const { setJoined } = useCircleStore();
  const { setWatches } = useWatchStore();
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState("received");
  useEffect(() => {
    // load invitations on page render
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
  }, []);

  const acceptReceivedInvitationHandler = (id: number) => {
    apiReplyInvitation(id, true)
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

        apiGetJoinedCircles()
          .then(({ joinedCircles }) => {
            setJoined(joinedCircles);
          })
          .catch((error: ErrorResponse) => {
            enqueueSnackbar({
              message: error.messages.join("\n"),
              variant: "error",
            });
          });

        apiGetAllWatches()
          .then(({ watches }) => {
            setWatches(watches);
          })
          .catch((error: ErrorResponse) => {
            enqueueSnackbar({
              message: error.messages.join("\n"),
              variant: "error",
            });
          });

        enqueueSnackbar("Circle invitation accepted", { variant: "success" });
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar(error.messages.join("\n"), { variant: "error" });
      });
  };

  const declineReceivedInvitationHandler = (id: number) => {
    apiReplyInvitation(id, false)
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
        enqueueSnackbar("Circle invitation declined", { variant: "success" });
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar(error.messages.join("\n"), { variant: "error" });
      });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const getInvitationStatus = (isAccepted?: boolean): string => {
    const isFlagSet = isAccepted !== undefined ? isAccepted : false;
    if (isFlagSet === true) return "Accepted";
    else if (isFlagSet === false) return "Declined";
    else return "Pending";
  };

  return (
    <>
      <ApplicationBar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Invitations
        </Typography>

        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="Invitations tab">
              <Tab label="Received" value="received" />
              <Tab label="Sent" value="sent" />
            </TabList>
          </Box>
          <TabPanel value="received">
            {received.length === 0 ? (
              <Typography
                variant="h5"
                component="h5"
                color="grey"
                align="center"
                marginTop={4}
              >
                No received invitations for now
              </Typography>
            ) : (
              received.map((invitation) => (
                <Box key={invitation.invitationId} marginBottom="16px">
                  <InvitationCard
                    name={`Invitation to circle: ${invitation.invitationCircleName}`}
                    date={new Date(invitation.createdAt).toLocaleString()}
                    status={getInvitationStatus(invitation.isAccepted)}
                    sender={invitation.invitationCircleOwnerUsername}
                    onAccept={() =>
                      acceptReceivedInvitationHandler(invitation.invitationId)
                    }
                    onDecline={() =>
                      declineReceivedInvitationHandler(invitation.invitationId)
                    }
                  />
                </Box>
              ))
            )}
          </TabPanel>
          <TabPanel value="sent">
            {sent.length === 0 ? (
              <Typography
                variant="h5"
                component="h5"
                color="grey"
                align="center"
                marginTop={4}
              >
                No sent invitations for now
              </Typography>
            ) : (
              sent.map((invitation) => (
                <Box key={invitation.invitationId} marginBottom="16px">
                  <InvitationCard
                    name={`Invitation to circle: ${invitation.invitationCircleName}`}
                    date={new Date(invitation.createdAt).toLocaleString()}
                    status={getInvitationStatus(invitation.isAccepted)}
                    receiver={invitation.receiverUsername}
                  />
                </Box>
              ))
            )}
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};
export default Invitations;
