import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { HomeRoute } from "./route";

const routeTree = rootRoute.addChildren([HomeRoute]);

export const router = createRouter({ routeTree });
