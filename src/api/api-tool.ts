import ApiRequestHandler from "./api-request-handler";

const apiRequestHandler = new ApiRequestHandler();

export const baseUrl = "https://localhost/api";

export const fetchApi = (endpoint: string, options: RequestInit) => {
  return apiRequestHandler.executeFetch({
    url: `${baseUrl}${endpoint}`,
    options,
  });
};

export interface ErrorResponse {
  messages: string[];
}
