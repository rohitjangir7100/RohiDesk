import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";// adjust path based on your structure
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function FeedbackModal({ open, onClose }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser)
      return toast.error("You must be logged in to send feedback.");
    e.preventDefault();
    if (!message.trim()) return toast.error("Feedback cannot be empty");

    try {
      await addDoc(collection(db, "feedbacks"), {
        message: message.trim(),
        timestamp: Timestamp.now(),
        userId: currentUser.uid,
      });

      toast.success("Thank you for your feedback! 🎉");
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("Something went wrong while sending feedback 😓");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-11/12 max-w-md rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <XMarkIcon className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Send Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-3 bg-transparent dark:border-gray-600 dark:text-white"
            placeholder="Tell us what you think..."
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
