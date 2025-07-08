import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/Login/components/LoginPage";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginPage />;
}
