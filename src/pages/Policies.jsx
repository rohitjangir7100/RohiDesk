import React from "react";

export default function Policies() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Razorpay Policies</h1>
      <ul className="space-y-2 list-disc ml-6">
        <li>
          <a
            href="https://merchant.razorpay.com/policy/QghWOQH7ySpEkR/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a
            href="https://merchant.razorpay.com/policy/QghWOQH7ySpEkR/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline">
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="https://merchant.razorpay.com/policy/QghWOQH7ySpEkR/refund"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline">
            Refund Policy
          </a>
        </li>
        <li>
          <a
            href="https://merchant.razorpay.com/policy/QghWOQH7ySpEkR/shipping"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline">
            Shipping Policy
          </a>
        </li>
        <li>
          <a
            href="https://merchant.razorpay.com/policy/QghWOQH7ySpEkR/contact_us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  );
}
