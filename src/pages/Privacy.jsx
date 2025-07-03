import React from "react";

export default function Privacy() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At RohiDesk, we respect your privacy. This policy explains how we
        collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Your name and email address when you register.</li>
        <li>Tickets and messages you submit.</li>
        <li>Technical data like browser, device type, and usage stats.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use It</h2>
      <p className="mb-4">
        We use your data to provide services, improve support, and communicate
        updates. We never sell your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You can request to view, edit, or delete your data at any time by
        contacting our support team.
      </p>

      <p>Last updated: {new Date().getFullYear()}</p>
    </div>
  );
}
