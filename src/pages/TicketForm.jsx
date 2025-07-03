import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import emailjs from "emailjs-com";

/* 🔍 keyword → category map */
const KEYWORDS = {
  Billing: ["payment", "invoice", "bill", "refund", "charge"],
  Technical: ["error", "bug", "crash", "issue", "server", "code"],
  Account: ["login", "password", "account", "signup", "register"],
  Network: ["network", "connection", "internet", "offline", "latency"],
};

export default function TicketForm() {
  const { currentUser } = useAuth();
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("General");


  // const KEYWORDS = {
  //   Billing: ["payment", "invoice", "bill", "refund", "charge"],
  //   Technical: ["error", "bug", "crash", "issue", "server", "code"],
  //   Account: ["login", "password", "account", "signup", "register"],
  //   Network: ["network", "connection", "internet", "offline", "latency"],
  // };
  
  /* 🧠 auto‑suggest category */
  useEffect(() => {
    if (!description) return;

    const debounce = setTimeout(() => {
      const lower = description.toLowerCase();
      let bestMatch = "General";
      for (const [cat, words] of Object.entries(KEYWORDS)) {
        if (words.some((w) => lower.includes(w))) {
          bestMatch = cat;
          break;
        }
      }
      setCategory(bestMatch);
    }, 600);

    return () => clearTimeout(debounce);
  }, [description]);

  /* 🪙 Razorpay handler → Firestore & EmailJS */
  const handleSubmit = async () => {
    const options = {
      key: "rzp_test_pBYw3NDyMMMq2N",
      amount: 5000,
      currency: "INR",
      name: "RohiDesk",
      description: "Ticket Payment",
      
      handler: async () => {
        try {
          const docRef = await addDoc(collection(db, "tickets"), {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            description,
            priority,
            category,
            status: "Open",
            createdAt: new Date(),
          });
          toast.success("Ticket submitted ✅");
          sendEmail(docRef.id);
          setDescription("");
        } catch {
          toast.error("Ticket submission failed ❌");
        }
      },
      prefill: { email: currentUser.email },
    };
    options.method = "upi";
    options["upi"] = {
      flow: "collect",
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ✉️ EmailJS */
  const sendEmail = (ticketId) => {
    const params = {
      to_email: currentUser.email,
      ticket_id: ticketId,
      message: description,
    };
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        params,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => toast.info("Email sent 📧"))
      .catch(() => toast.warning("Email not sent"));
  };

  /* ⏎ Enter‑to‑submit */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md mt-4 sm:mt-6">
      <h2 className="text-2xl font-bold mb-4">Raise a Support Ticket</h2>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your issue..."
        className="w-full border p-2 rounded mb-4 dark:bg-gray-700"
      />

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded border p-2 dark:bg-gray-700">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Category (auto‑suggested) */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded border p-2 dark:bg-gray-700">
          <option>General</option>
          <option>Technical</option>
          <option>Billing</option>
          <option>Account</option>
          <option>Network</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          * Category auto‑suggests after you pause typing
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit & Pay ₹50
      </button>
    </div>
  );
}
