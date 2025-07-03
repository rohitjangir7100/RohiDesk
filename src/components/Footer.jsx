import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FeedbackModal from "./FeedbackModal"; // 💬 Create this if not already

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Feedback Modal */}
      <FeedbackModal open={showModal} onClose={() => setShowModal(false)} />

      <footer className="border-t dark:border-gray-700 px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-[#0f172a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding */}
          <div>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              RohiDesk
            </span>{" "}
            — All rights reserved.
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              Home
            </Link>
            <Link
              to="/raise-ticket"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              Raise Ticket
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              About
            </Link>
            <Link
              to="/privacy"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              Privacy
            </Link>
            <Link
              to="/terms"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              Terms
            </Link>
            <Link
              to="/policies"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition">
              Policies
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              Feedback
            </button>
            <a
              href="mailto:rohitjangir7100@gmail.com"
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
              Contact
            </a>
          </div>

          {/* Version + Social Icons */}
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>v1.0.0 • Built with ❤️ by Rohit Jangir</span>
            <a
              href="https://github.com/rohitjangir7100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/rohit7100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
