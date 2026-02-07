import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { rootRoute } from "./root.route";

export const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../pages/home")),
});