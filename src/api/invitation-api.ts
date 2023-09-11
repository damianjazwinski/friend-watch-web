import { IInvitation } from "../types";
import { fetchApi } from "./api-tool";

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

export const apiGetInvitations = (): Promise<{
  sentInvitations: IInvitation[];
  receivedInvitations: IInvitation[];
}> => {
  return fetchApi("/invitation/all", {
    method: "GET",
    credentials: "include",
  });
};

export const apiReplyInvitation = (
  invitationId: number,
  acceptance: boolean
): Promise<any> => {
  return fetchApi("/invitation/reply", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ invitationId, acceptance }),
    headers: { "Content-Type": "application/json" },
  });
};
