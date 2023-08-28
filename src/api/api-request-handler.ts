import { baseUrl } from "./api-tool";
import { useUserStore } from "../store";
import { enqueueSnackbar } from "notistack";

interface PromiseGuts {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  options: RequestInit;
  url: string;
}

class ApiRequestHandler {
  private requestQueue: PromiseGuts[] = [];
  private isPaused: boolean = false;

  executeRequests() {
    this.requestQueue.forEach(
      ({ resolve, reject, options, url }: PromiseGuts) => {
        fetch(url, options).then(async (response) => {
          if (response.ok) resolve(await response.json());
          else reject(await response.text());
        });
      }
    );
    this.requestQueue = [];
  }

  failRequests(message: any) {
    this.requestQueue.forEach(({ reject }: PromiseGuts) => {
      reject(message);
    });
    this.requestQueue = [];
  }

  async refreshToken() {
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      this.failRequests({ status: response.status });
      useUserStore.getState().logout();
      enqueueSnackbar("Session timeout", { variant: "error" });
    } else
      localStorage["tokenExpirations"] = JSON.stringify(await response.json());
  }

  async executeFetch({ url, options }: Pick<PromiseGuts, "url" | "options">) {
    return new Promise(async (resolve, reject) => {
      if (this.isPaused) {
        this.requestQueue.push({ resolve, reject, url, options });
      } else {
        await fetch(url, options).then(async (response) => {
          if (response.ok) resolve(await response.json());
          else if (response.status == 401) {
            this.requestQueue.push({ resolve, reject, url, options });
            if (this.isPaused) return;

            this.isPaused = true;
            await this.refreshToken();
            this.isPaused = false;
            await this.executeRequests();
          } else reject(await response.text());
        });
      }
    });
  }
}

export default ApiRequestHandler;
