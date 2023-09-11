import { fetchApi } from "./api-tool";

export const apiCreateInvitationLink = (
  circleId: number
): Promise<{ link: string }> => {
  return fetchApi("/invitation/create/link", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ circleId }),
    headers: { "Content-Type": "application/json" },
  });
};

export const apiCreateInvitation = (
  circleId: number,
  receiverUsername: string
): Promise<any> => {
  return fetchApi("/invitation/create", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ circleId, receiverUsername }),
    headers: { "Content-Type": "application/json" },
  });
};
