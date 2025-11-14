import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((state) => state.token);

  // if no token => redirect to login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // else allow access
  return children;
}
