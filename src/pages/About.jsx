import React from "react";

export default function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">About RohiDesk</h1>
      <p className="mb-4">
        RohiDesk is a modern, responsive, and smart service desk application
        designed to streamline customer support and internal ticket management.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="mb-4">
        To simplify support systems and improve user experience with reliable,
        secure, and intuitive technology.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Key Features</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Raise, track, and manage tickets easily</li>
        <li>Real-time updates and notifications</li>
        <li>Dark/light theme, responsive design</li>
        <li>PDF download, Google login, offline detection</li>
      </ul>

      <p className="mt-6">Built with ❤️ by Rohit Jangir.</p>
    </div>
  );
}
