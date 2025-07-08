import { createFileRoute, redirect } from "@tanstack/react-router";
import type { IUser } from "@/Auth/models/user.models";
import Editor from "@/Editor/components/Editor";
import { store } from "@/store";
import { updateAuth } from "@/Auth/store/authSlice";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: () => {
    try {
      const localStorageUser = localStorage.getItem("user");
      if (localStorageUser === null) {
        throw redirect({
          to: "/login",
        });
      }
      const user: IUser | null | undefined = JSON.parse(localStorageUser);
      if (!user || !user.id) {
        throw redirect({
          to: "/login",
        });
      }
      store.dispatch(updateAuth(user));
    } catch (e) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-100">
      <Editor />
    </div>
  );
}
