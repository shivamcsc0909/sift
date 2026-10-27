import { Download, Headphones, Menu, ShieldCheck, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import InquiryModal from "../forms/InquiryModel"

const navLinks = [
  { to: "/", label: "Insurance Products" },
  { to: "/health-insurance", label: "Health Insurance" },
  { to: "/vehicle-insurance?variant=car", label: "Motor Insurance" },
  { to: "/claims-support", label: "Renew a Policy" },
];

function navClass({ isActive }) {
  return `px-3 py-2 text-sm font-semibold ${isActive ? "text-[#0065ff]" : "text-slate-700 hover:text-[#0065ff]"
    }`;
}

export default function SiteLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2" aria-label="PolicySift home">
            <img
              src="/icon.png"
              alt="PolicySift"
              className="h-12 w-auto max-w-[180px] object-contain"
            />
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 text-sm font-semibold text-slate-700 lg:flex">
            <a className="flex items-center gap-2 hover:text-[#0065ff]" href="#app">
              <Download size={17} />
              Download App
            </a>
            <button
              className="flex items-center gap-2 hover:text-[#0065ff]"
              onClick={() => setOpenForm(true)}
            >
              <Headphones size={17} />
              Talk to Expert
            </button>
            <a className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 hover:border-[#0065ff] hover:text-[#0065ff]" href="#support">
              <UserCircle size={17} />
              Sign In
            </a>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <a className="px-3 py-2 text-sm font-semibold text-slate-700" href="#app">
                Download App
              </a>
              <button
                onClick={() => {
                  setOpenForm(true);
                  setIsOpen(false);
                }}
                className="px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:text-[#0065ff]"
              >
                Talk to Expert
              </button>
            </div>

          </div>

        ) : null}
      </header>
      <InquiryModal
        open={openForm}
        onClose={() => setOpenForm(false)}
      />

      <main>
        <Outlet />
      </main>

      <footer id="support" className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
          <div>
            <div className="text-xl font-black">
              <span className="text-[#0065ff]">Policy</span>
              <span className="text-[#f58220]">Sift</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Compare insurance plans, renew policies, and get claim guidance
              from one clear React experience.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">Explore</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className="hover:text-[#0065ff]">
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">Have a question?</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Customer sales enquiries: +91-74281-19439
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              General enquiries: amit1sri@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-slate-200 bg-[#f8fafc]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>(c) 2026 PolicySift. All rights reserved.</p>
            <p className="font-semibold text-slate-800">Developed by Shivam Pandey</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
