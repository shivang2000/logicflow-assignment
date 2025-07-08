import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { store } from "@/store";

export const Route = createRootRoute({
  component: () => (
    <Provider store={store}>
      <Outlet />
    </Provider>
  ),
});
