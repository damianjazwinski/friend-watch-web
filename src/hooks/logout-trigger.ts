import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "../store";
import { useEffect } from "react";

const useLogoutTrigger = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem("tokenExpirations");
      navigate({ to: "/login" });
    }
  }, [isLoggedIn]);
};

export default useLogoutTrigger;
