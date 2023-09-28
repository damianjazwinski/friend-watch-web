import { baseUrl } from "./api-tool";

export const apiLogin = (username: string, password: string) => {
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  };

  return fetch(`${baseUrl}/auth/login`, options);
};

export const apiRegister = (
  username: string,
  password: string,
  confirmPassword: string
) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, confirmPassword }),
  };

  return fetch(`${baseUrl}/auth/register`, options);
};

export const apiLogout = () => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
};
