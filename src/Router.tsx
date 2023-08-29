import {
  redirect,
  RootRoute,
  Route,
  Router,
  RouterProvider as RP,
} from "@tanstack/react-router";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useUserStore } from "./store";
import Circles from "./pages/circles/Circles";

const rootRoute = new RootRoute();

const checkLoginFlag = () => {
  const isAuthenticated = useUserStore.getState().isLoggedIn;
  if (!isAuthenticated)
    throw redirect({
      to: "/login",
    });
};

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Register,
  path: "/register",
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Login,
  path: "/login",
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Home,
  path: "/home",
  beforeLoad: checkLoginFlag,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Home,
  path: "/",
  beforeLoad: checkLoginFlag,
});

const circlesRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Circles,
  path: "/circles",
  beforeLoad: checkLoginFlag,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  registerRoute,
  loginRoute,
  indexRoute,
  circlesRoute,
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const RouterProvider = (): JSX.Element => {
  return <RP router={router} />;
};

export default RouterProvider;
