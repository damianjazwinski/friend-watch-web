import { fetchApi } from "./api-tool";

export const apiGetUser = (): Promise<{
  id: number;
  username: string;
  userAvatarUrl?: string;
}> => fetchApi("/user", { method: "GET", credentials: "include" });

export const apiSetUserAvatar = (
  avatarImage: File
): Promise<{ userAvatarUrl: string }> => {
  const formData = new FormData();
  formData.append("userAvatarImage", avatarImage as Blob);
  return fetchApi("/user/avatar", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
};
