import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { IComment } from "../../types";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiCommentWatch, apiGetAllWatches } from "../../api/watches-api";
import { useWatchStore } from "../../store";
import { useSnackbar } from "notistack";
import { ErrorResponse } from "../../api/api-tool";

interface CommentsProps {
  comments: IComment[];
  watchId: number;
}

interface CommentInput {
  content: string;
}

const Comments = ({ comments, watchId }: CommentsProps): JSX.Element => {
  const { setWatches } = useWatchStore();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CommentInput>();

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    apiCommentWatch(watchId, data.content)
      .then(() => {
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
      })
      .catch((error: ErrorResponse) => {
        enqueueSnackbar({
          message: error.messages.join("\n"),
          variant: "error",
        });
      });
    reset();
  };

  return (
    <>
      <Box mt={comments.length === 0 ? 0 : 3}>
        <List>
          {comments.map((comment, index) => (
            <ListItem
              key={comment.commentId}
              divider={index !== comments.length - 1}
            >
              <ListItemAvatar sx={{}}>
                <Avatar alt={comment.commenterName} src="/2.png?url" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.commenterName}
                secondary={comment.content}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        alignItems={"center"}
      >
        <Box flexGrow={1}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            error={!!errors.content}
            helperText={errors.content?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("content", { required: "Comment cannot be empty" })}
          />
        </Box>
      </Box>
    </>
  );
};

export default Comments;
