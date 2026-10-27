import { NavLink } from "react-router-dom";
import { BarChart3, BriefcaseBusiness, CalendarCheck, ClipboardList, Gauge, Laptop, LogOut, Settings, UserCheck, Users, WalletCards } from "lucide-react";
import { authService } from "../../services/authService";

const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: Gauge },
  { label: "Employees", path: "/employees", icon: Users },
  { label: "Attendance", path: "/attendance", icon: CalendarCheck },
  { label: "Leave Management", path: "/leaves", icon: ClipboardList },
  { label: "Payroll", path: "/payroll", icon: WalletCards },
  { label: "Recruitment", path: "/recruitment/jobs", icon: BriefcaseBusiness },
  { label: "Onboarding", path: "/onboarding", icon: UserCheck },
  { label: "Assets", path: "/assets", icon: Laptop },
  { label: "Offboarding", path: "/offboarding", icon: LogOut },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ onNavigate }) {
  const session = authService.getCurrentSession();
  const visibleItems = authService.getAllowedNavigation(navigationItems, session?.role || "Employee");

  return (
    <aside className="flex h-full flex-col bg-background-sidebar px-4 py-5">
      <NavLink to="/dashboard" onClick={onNavigate} className="mb-6 flex items-center gap-3 px-2">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-lg font-black text-white">T</span>
        <div><p className="font-black text-text-primary">TeamHub</p><p className="text-xs font-semibold text-text-secondary">HRMS</p></div>
      </NavLink>
      <nav className="flex-1 space-y-1">
        {visibleItems.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} onClick={onNavigate} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-white text-primary-dark shadow-sm" : "text-text-secondary hover:bg-background-hover hover:text-text-primary"}`}>
            <Icon size={18} />{label}
          </NavLink>
        ))}
      </nav>
      <div className="rounded-2xl bg-white/65 p-4 text-sm text-text-secondary">
        <p className="font-bold text-text-primary">Role-aware UI</p>
        <p className="mt-1">{session?.role || "Employee"} access is active for this session.</p>
      </div>
    </aside>
  );
}
