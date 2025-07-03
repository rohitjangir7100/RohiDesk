import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

export default function FloatingAlert({ show, text, onClose }) {
  /* Auto‑hide after 3 s */
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [show, onClose]);

  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transform transition duration-300"
      enterFrom="translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <div className="fixed bottom-5 right-5 z-[70]">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded shadow-lg
                        bg-white text-gray-800
                        dark:bg-slate-800 dark:text-gray-100">
          {text}
          <button onClick={onClose} className="ml-2 text-xs hover:underline">
            ✕
          </button>
        </div>
      </div>
    </Transition>
  );
}
