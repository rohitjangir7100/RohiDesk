import React from "react";

export default function Terms() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        By using RohiDesk, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Account Responsibility
      </h2>
      <p className="mb-4">
        You are responsible for maintaining the security of your account and all
        activities under it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Prohibited Use</h2>
      <p className="mb-4">
        You agree not to use RohiDesk for any unlawful activities, spam,
        harassment, or abuse of service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Modifications</h2>
      <p className="mb-4">
        We reserve the right to modify these terms at any time with notice.
        Continued use means you accept changes.
      </p>

      <p>Last updated: {new Date().getFullYear()}</p>
    </div>
  );
}
