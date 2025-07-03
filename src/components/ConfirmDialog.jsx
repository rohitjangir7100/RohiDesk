// src/components/ConfirmDialog.jsx
import React from "react";
import { Dialog } from "@headlessui/react";

export default function ConfirmDialog({ open, onClose, onConfirm, message }) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="bg-black/40 fixed inset-0" />
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg max-w-sm w-full">
          <Dialog.Title className="font-semibold text-lg mb-4">
            Confirm
          </Dialog.Title>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-slate-700">
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-red-600 text-white">
              Yes, delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
