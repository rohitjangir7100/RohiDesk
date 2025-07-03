// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog"; // 👈 import

export default function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null); // 🛑 dialog control

  /* live tickets */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tickets"), (snap) =>
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  /* counts */
  const counts = tickets.reduce(
    (a, t) => ({ ...a, [t.status]: (a[t.status] || 0) + 1 }),
    {}
  );

  /* handler after user confirms */
  const markResolved = async (id) => {
    await updateDoc(doc(db, "tickets", id), { status: "Resolved" });
    toast.success("Marked Resolved ✅");
  };

  const filtered = tickets.filter((t) =>
    t.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {["Open", "In Progress", "Resolved"].map((s) => (
          <div
            key={s}
            className="card text-center dark:bg-slate-800 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{s}</h3>
            <p className="text-3xl font-extrabold">{counts[s] || 0}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tickets…"
        className="w-full max-w-sm border p-2 rounded mb-4 dark:bg-slate-800 dark:border-slate-600"
      />

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-[750px] w-full text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-700">
              <th className="p-2">ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Issue</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-slate-800">
                <td className="p-2">{t.id.slice(0, 6)}…</td>
                <td className="p-2">{t.userId}</td>
                <td className="p-2">{t.description}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2">
                  {t.status !== "Resolved" && (
                    <button
                      onClick={() => setConfirmId(t.id)} // 👈 open dialog
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm dialog */}
      <ConfirmDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => confirmId && markResolved(confirmId)}
        message="Mark this ticket as resolved?"
      />
    </div>
  );
}
