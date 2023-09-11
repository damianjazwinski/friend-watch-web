import { Box, Button, Card, CardContent, Typography } from "@mui/material";

interface InvitationCardProps {
  name: string;
  date: string;
  sender?: string; // For received invitations
  status?: string; // For sent invitations
  onAccept?: () => void; // For received invitations
  onDecline?: () => void; // For received invitations
}

const InvitationCard = ({
  name,
  date,
  sender,
  status,
  onAccept,
  onDecline,
}: InvitationCardProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">{date}</Typography>
        {sender && (
          <Typography variant="body2" color="textSecondary">
            Received from: {sender}
          </Typography>
        )}
        {status && (
          <Typography variant="body2" color="textSecondary">
            Status: {status}
          </Typography>
        )}
        {onAccept && onDecline && (
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={2}
            justifyContent={"flex-end"}
            marginTop={1}
          >
            <Button variant="contained" color="secondary" onClick={onDecline}>
              Decline
            </Button>
            <Button variant="contained" color="primary" onClick={onAccept}>
              Accept
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
