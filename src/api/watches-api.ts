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
