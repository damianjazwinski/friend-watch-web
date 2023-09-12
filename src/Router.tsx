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
import NotFound from "./pages/not-found/NotFound";
import { useUserStore } from "./store";
import JoinedCircles from "./pages/circles/JoinedCircles";
import OwnedCircles from "./pages/circles/OwnedCircles";
import CreateCircle from "./pages/circles/CreateCircle";
import OwnCircle from "./pages/circles/pages/OwnCircle";
import Invitations from "./pages/invitations/Invitations";
import JoinedCircle from "./pages/circles/pages/JoinedCircle";

const rootRoute = new RootRoute();

const checkLoginFlag = () => {
  const isAuthenticated = useUserStore.getState().isLoggedIn;
  if (!isAuthenticated)
    throw redirect({
      to: "/login",
    });
};

const invalidRoute = new Route({
  getParentRoute: () => rootRoute,
  component: NotFound,
  beforeLoad: checkLoginFlag,
  path: "*",
});

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

const joinedCirclesRoute = new Route({
  getParentRoute: () => rootRoute,
  component: JoinedCircles,
  path: "/circles/joined",
  beforeLoad: checkLoginFlag,
});

const ownedCirclesRoute = new Route({
  getParentRoute: () => rootRoute,
  component: OwnedCircles,
  path: "/circles/owned",
  beforeLoad: checkLoginFlag,
});

const ownCircleRoute = new Route({
  getParentRoute: () => rootRoute,
  component: OwnCircle,
  path: "/circles/owned/$circleId",
  beforeLoad: checkLoginFlag,
});

const joinedCircleRoute = new Route({
  getParentRoute: () => rootRoute,
  component: JoinedCircle,
  path: "/circles/joined/$circleId",
  beforeLoad: checkLoginFlag,
});

const createCircleRoute = new Route({
  getParentRoute: () => rootRoute,
  component: CreateCircle,
  path: "/circles/create",
  beforeLoad: checkLoginFlag,
});

const invitationsRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Invitations,
  path: "/invitations",
  beforeLoad: checkLoginFlag,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  registerRoute,
  loginRoute,
  indexRoute,
  joinedCirclesRoute.addChildren([joinedCircleRoute]),
  ownedCirclesRoute.addChildren([ownCircleRoute]),
  createCircleRoute,
  invitationsRoute,
  invalidRoute,
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
