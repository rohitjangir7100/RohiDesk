import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth(); // may be undefined | null | user
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // subscribe only when a user exists
  useEffect(() => {
    if (!currentUser) {
      setLoading(false); // either not signed‑in or auth still null
      return;
    }

    const q = query(
      collection(db, "tickets"),
      where("userId", "==", currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setTickets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return unsub; // cleanup listener
  }, [currentUser]);

  /* 1️⃣  firebase auth still initializing or listener loading */
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  /* 2️⃣ not logged in */
  if (!currentUser) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to view your dashboard.
        </p>
      </div>
    );
  }

  /* 3️⃣ logged in */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          You haven’t raised any tickets yet.
        </p>
      ) : (
        tickets.map((t) => (
          <div key={t.id} className="card">
            <p>
              <strong>Description:</strong> {t.description}
            </p>
            <p>
              <strong>Status:</strong> {t.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
