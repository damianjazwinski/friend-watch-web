import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { IComment } from "../../types";
import Comments from "../comments/Comments";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface WatchProps {
  id: number;
  message: string;
  externalLink?: string;
  creatorUsername: string;
  creatorAvatarUrl?: string;
  createdAt: string;
  circleName?: string;
  comments: IComment[];
}

const Watch = ({
  id,
  message,
  externalLink,
  creatorUsername,
  creatorAvatarUrl,
  createdAt,
  circleName,
  comments,
}: WatchProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Card square elevation={3} sx={{ margin: "16px 0", padding: "16px" }}>
        <Box padding={2}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={1}
            alignItems={"center"}
          >
            <Avatar src={creatorAvatarUrl ?? ""} />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="body1" component="span" fontWeight={500}>
                {creatorUsername}
              </Typography>
              {circleName && (
                <Typography variant="caption">{circleName}</Typography>
              )}
              <Typography variant="caption">{createdAt}</Typography>
            </Box>
          </Box>
          <Typography variant="body1" marginY={1}>
            {message}
          </Typography>
          <Box mt={5} display={"flex"} flexDirection={"row"} gap={1}>
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
            <Button
              variant="contained"
              onClick={() => setIsExpanded(!isExpanded)}
              endIcon={
                isExpanded ? (
                  <ExpandLess onClick={() => setIsExpanded(false)} />
                ) : (
                  <ExpandMore />
                )
              }
            >
              Comments
            </Button>
          </Box>
        </Box>

        <Collapse in={isExpanded} timeout="auto">
          <CardContent sx={{ paddingTop: "0" }}>
            <Comments comments={comments} watchId={id} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Watch;
