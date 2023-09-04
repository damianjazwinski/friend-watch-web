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
