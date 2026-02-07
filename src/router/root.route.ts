import { createRootRoute } from "@tanstack/react-router";
import MainLayout from "../components/layouts/main-layout";

export const rootRoute = createRootRoute({
  component: MainLayout,
});
