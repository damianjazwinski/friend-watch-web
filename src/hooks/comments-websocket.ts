import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";
import { useWatchStore } from "../store";
import { apiGetAllWatches } from "../api/watches-api";
import { useSnackbar } from "notistack";
import { ErrorResponse } from "../api/api-tool";

const useCommentsWebsocket = () => {
  const { setWatches } = useWatchStore();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7011/commentsHub")
      .build();

    hubConnection.start();

    hubConnection.on("NewCommentEvent", () => {
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
    });
  }, []);
};

export default useCommentsWebsocket;
