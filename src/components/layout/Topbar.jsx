import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { authService } from "../../services/authService";
import { leaveService } from "../../services/leaveService";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [session] = useState(() => authService.getCurrentSession());
  const [logoutError, setLogoutError] = useState("");
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [leaveNotifications, setLeaveNotifications] = useState([]);
  const role = session?.role || "Employee";
  const initials = useMemo(() => role.slice(0, 2).toUpperCase(), [role]);

  useEffect(() => {
    async function loadPendingLeaves() {
      if (!["Admin", "HR", "Manager"].includes(role)) {
        setPendingLeaves(0);
        setLeaveNotifications([]);
        return;
      }
      try {
        const approvals = await leaveService.getApprovals();
        const pending = approvals.filter((item) => item.status === "Pending");
        setPendingLeaves(pending.length);
        setLeaveNotifications(pending.slice(0, 4));
      } catch {
        setPendingLeaves(0);
        setLeaveNotifications([]);
      }
    }
    loadPendingLeaves();
  }, [role]);

  async function handleLogout() {
    try {
      setLogoutError("");
      await authService.logout();
      navigate("/", { replace: true });
    } catch (error) {
      setLogoutError(error.message || "Unable to log out");
    }
  }

  function toggleNotifications() {
    setNotificationsOpen((current) => !current);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border-light bg-background-main/90 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" icon={Menu} onClick={onMenuClick} className="px-3 lg:hidden" />
        <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 text-text-muted md:flex">
          <Search size={18} /><input className="w-full bg-transparent text-sm outline-none placeholder:text-text-muted" placeholder="Search employees, payroll, leaves..." />
        </div>
        <div className="relative">
          <Button variant="secondary" icon={Bell} className="relative px-3" aria-label="Notifications" onClick={toggleNotifications}>
          {pendingLeaves > 0 ? <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-error px-1 text-[10px] font-bold leading-none text-white">{pendingLeaves > 9 ? "9+" : pendingLeaves}</span> : null}
          </Button>
          {notificationsOpen ? (
            <div className="absolute right-0 top-12 z-30 w-80">
              <Card hover={false} className="shadow-soft">
                <div className="flex items-center justify-between border-b border-border-light pb-3">
                  <div>
                    <p className="text-sm font-bold text-text-primary">Notifications</p>
                    <p className="text-xs text-text-muted">{pendingLeaves} pending leave approvals</p>
                  </div>
                  <Badge>{role}</Badge>
                </div>
                <div className="mt-3 space-y-2">
                  {leaveNotifications.length ? leaveNotifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate("/leaves/approvals");
                      }}
                      className="w-full rounded-xl border border-border-light bg-background-soft px-3 py-2 text-left transition hover:bg-background-hover"
                    >
                      <p className="text-sm font-semibold text-text-primary">{item.employee || "Leave request"}</p>
                      <p className="text-xs text-text-secondary">{item.type || "Leave"} is waiting for review</p>
                    </button>
                  )) : <p className="rounded-xl bg-background-soft px-3 py-2 text-sm text-text-secondary">No pending leaves right now.</p>}
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="secondary" className="px-3 py-2 text-xs" onClick={() => { setNotificationsOpen(false); navigate("/leaves/approvals"); }}>Open approvals</Button>
                </div>
              </Card>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-2 py-1.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-background-hover text-sm font-bold text-primary-dark">{initials}</span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-text-primary">{session?.user.name}</p>
            <p className="text-xs text-text-muted">{role}</p>
          </div>
        </div>
        <Button variant="ghost" icon={LogOut} onClick={handleLogout} className="px-3" aria-label="Logout" />
      </div>
      {logoutError ? <p className="mt-2 text-right text-xs font-semibold text-error">{logoutError}</p> : null}
    </header>
  );
}
