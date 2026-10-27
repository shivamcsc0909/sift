import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

export default function RequireAuth() {
  const location = useLocation();
  const session = authService.getCurrentSession();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!authService.canAccess(location.pathname, session.role)) {
    return <Navigate to="/dashboard" replace state={{ blockedPath: location.pathname }} />;
  }

  return <Outlet />;
}
