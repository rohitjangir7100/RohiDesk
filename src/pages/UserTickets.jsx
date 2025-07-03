import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserTickets() {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // 👀 Listen to changes in dark/light mode dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "tickets"),
      where("userId", "==", currentUser.uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, [currentUser]);

  const downloadPDF = (ticket) => {
    const doc = new jsPDF();
    doc.text(`Ticket ID: ${ticket.id}`, 10, 10);
    doc.text(`Issue: ${ticket.description}`, 10, 20);
    doc.text(`Priority: ${ticket.priority}`, 10, 30);
    doc.text(`Category: ${ticket.category}`, 10, 40);
    doc.text(`Status: ${ticket.status}`, 10, 50);
    doc.save(`ticket-${ticket.id}.pdf`);
  };

  if (!currentUser)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to view your tickets.
        </p>
      </div>
    );

  // 🎨 Color scheme per theme
  const baseColor = isDark ? "#1e293b" : "#f3f4f6"; // dark: slate-800, light: gray-100
  const highlightColor = isDark ? "#334155" : "#e5e7eb"; // dark: slate-700, light: gray-200

  return (
    <div className="p-6 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="rounded-lg p-4 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <Skeleton
                height={20}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <Skeleton
                height={20}
                style={{ marginTop: 10 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <Skeleton
                height={20}
                width={100}
                style={{ marginTop: 10 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </div>
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
            />
          </svg>
          <h2 className="text-xl font-semibold">No Tickets Found</h2>
          <p className="text-sm mb-4">
            You haven't raised any support tickets yet.
          </p>
          <Link
            to="/raise-ticket"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            Raise Ticket
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="card">
              <p>
                <strong>Issue:</strong> {ticket.description}
              </p>
              <p>
                <strong>Priority:</strong> {ticket.priority}
              </p>
              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
              <button
                onClick={() => downloadPDF(ticket)}
                className="mt-2 bg-gray-700 text-white px-3 py-1 rounded">
                Download PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
