import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import useNetworkStatus from "../hooks/useNetworkStatus";
import { BellIcon } from "@heroicons/react/24/outline";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

/* link base style */
const linkBase =
  "relative inline-flex items-center px-3 py-1.5 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

/* re‑usable nav link */
const HoverLink = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `${linkBase} ${
        isActive ? "text-blue-100" : "text-white hover:text-blue-200"
      }`
    }>
    <span className="after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full">
      {children}
    </span>
  </NavLink>
);

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);

  /* 🔔 notification badge + list */
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  /* 🌐 network banner */
  const isOnline = useNetworkStatus();

  /* listen to unresolved tickets */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "tickets"),
      where("userId", "==", currentUser.uid),
      where("status", "!=", "Resolved")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        message: `Ticket "${d.data().description}" is ${d.data().status}`,
      }));
      setNotifications(data);
      setUnreadCount(data.length);
    });

    return unsub;
  }, [currentUser]);

  /* close mobile drawer */
  const closeMobile = () => setOpen(false);

  return (
    <>
      {!isOnline && (
        <div className="bg-red-600 text-white text-sm text-center py-1">
          🚫 You're offline. Some features may not work!
        </div>
      )}

      <header className="z-50 bg-blue-700 dark:bg-[#1e293b] shadow border-b border-blue-800 dark:border-slate-700">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* brand */}
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-2 z-50 relative">
            <Logo className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            <span className="text-2xl font-bold text-white">RohiDesk</span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex gap-3 items-center">
            {currentUser && (
              <div className="relative">
                <BellIcon className="w-6 h-6 text-white hover:text-blue-200" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                      {unreadCount}
                    </span>

                    {/* dropdown */}
                    <div className="absolute top-8 right-0 mt-2 w-64 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
                      <ul className="divide-y dark:divide-gray-700">
                        {notifications.map((n) => (
                          <li
                            key={n.id}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                            {n.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}

            {currentUser && (
              <>
                <HoverLink to="/raise-ticket">Raise Ticket</HoverLink>
                <HoverLink to="/my-tickets">My Tickets</HoverLink>
                <HoverLink to="/admin">Admin</HoverLink>
              </>
            )}

            <ThemeToggle />

            {!currentUser ? (
              <>
                <HoverLink to="/login">Login</HoverLink>
                <HoverLink to="/register">Register</HoverLink>
              </>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>

          {/* burger (mobile) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg
              className={`w-6 h-6 transition-transform ${
                open ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </nav>

        {/* mobile drawer */}
        {open && (
          <div className="md:hidden bg-blue-700 dark:bg-gray-900 px-4 pb-4 space-y-2">
            {currentUser && (
              <>
                <HoverLink to="/raise-ticket" onClick={closeMobile}>
                  Raise Ticket
                </HoverLink>
                <HoverLink to="/my-tickets" onClick={closeMobile}>
                  My Tickets
                </HoverLink>
                <HoverLink to="/admin" onClick={closeMobile}>
                  Admin
                </HoverLink>
              </>
            )}

            <ThemeToggle />

            {!currentUser ? (
              <>
                <HoverLink to="/login" onClick={closeMobile}>
                  Login
                </HoverLink>
                <HoverLink to="/register" onClick={closeMobile}>
                  Register
                </HoverLink>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  closeMobile();
                }}
                className={`${linkBase} text-white hover:text-red-300`}>
                Logout
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
}
