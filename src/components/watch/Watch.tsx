import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

interface WatchProps {
  id: number;
  message: string;
  externalLink?: string;
  creatorUsername: string;
  createdAt: string;
}

const Watch = ({
  id,
  message,
  externalLink,
  creatorUsername,
  createdAt,
}: WatchProps): JSX.Element => {
  return (
    <>
      <Paper
        square
        key={id}
        elevation={3}
        sx={{ margin: "16px 0", padding: "16px" }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
        >
          <Avatar />
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="body1" component="span" fontWeight={500}>
              {creatorUsername}
            </Typography>
            <Typography variant="caption">{createdAt}</Typography>
          </Box>
        </Box>
        <Typography variant="body1" marginY={1}>
          {message}
        </Typography>
        {externalLink && (
          <Button
            href={externalLink}
            target="_blank"
            variant="contained"
            endIcon={<LinkIcon />}
          >
            Watch
          </Button>
        )}
      </Paper>
      <Paper
        square
        key={id}
        elevation={3}
        sx={{ margin: "16px 0", padding: "16px" }}
      >
        <Typography variant="h5" component="h5">
          Comments
        </Typography>
        <Divider />
      </Paper>
    </>
  );
};

export default Watch;