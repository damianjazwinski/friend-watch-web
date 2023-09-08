import { ICircle } from "../types";
import { fetchApi } from "./api-tool";

export const apiCreateCircle = (
  name: string,
  circleImage: File
): Promise<any> => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("image", circleImage as Blob);
  return fetchApi("/circle", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
};

export const apiGetOwnedCircles = (): Promise<{ ownedCircles: ICircle[] }> => {
  return fetchApi("/circle/owned", {
    method: "GET",
    credentials: "include",
  });
};

export const apiGetOwnedCircle = (
  circleId: number | string
): Promise<{ circle: ICircle }> => {
  return fetchApi(`/circle/owned/${circleId}`, {
    method: "GET",
    credentials: "include",
  });
};
