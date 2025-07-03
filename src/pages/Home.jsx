import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  if (currentUser === undefined) return null;

  // 🚫 If not logged in
  if (!currentUser) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            You must be logged in to access RohiDesk.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
              Register
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ✅ Logged in view
  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="max-w-4xl mx-auto py-16">
        <div className="flex flex-col items-center gap-4">
          {/* Logo with white background in light mode */}
          <div className="bg-blue-700 p-4 rounded-full">
            <Logo className="w-20 h-20 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-center">
            Welcome to{" "}
            <span className="text-blue-700 dark:text-blue-400">RohiDesk</span>
          </h1>

          <p className="max-w-2xl text-lg text-center text-gray-700 dark:text-gray-300">
            Lightning‑fast support ticketing for your organisation — simple,
            secure and integrated with Razorpay payments.
          </p>

          <Link
            to="/raise-ticket"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
            Raise Your First Ticket
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300">
          How RohiDesk Works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
          {[
            {
              title: "Create",
              desc: "Submit an issue with priority & category—pay securely via Razorpay.",
              emoji: "📝",
            },
            {
              title: "Track",
              desc: "Get toast alerts & emails. Check real‑time progress any time.",
              emoji: "📈",
            },
            {
              title: "Resolve",
              desc: "Admins assign, update, and close tickets—download PDF reports.",
              emoji: "✅",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="card hover:shadow-lg transition shadow-sm dark:shadow-gray-700 bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-lg p-6">
              <div className="text-4xl mb-2">{f.emoji}</div>
              <h3 className="text-xl font-semibold mb-1 text-blue-700 dark:text-blue-300">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
