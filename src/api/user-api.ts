import { fetchApi } from "./api-tool";

export const apiGetUser = (): Promise<{ id: number; username: string }> =>
  fetchApi("/user", { method: "GET", credentials: "include" });
