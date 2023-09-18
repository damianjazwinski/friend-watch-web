import { IWatch } from "../types";
import { fetchApi } from "./api-tool";

export const apiCreateWatch = (
  circleId: number,
  message: string,
  externalLink?: string
): Promise<any> => {
  return fetchApi("/watch", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ circleId, message, externalLink }),
    headers: { "Content-Type": "application/json" },
  });
};

export const apiGetAllWatches = (): Promise<{ watches: IWatch[] }> => {
  return fetchApi("/watch/all", { method: "GET", credentials: "include" });
};
