"use client";

import { useState } from "react";
import EmailCaptureModal from "./EmailCaptureModal";

export default function UnlockSuccessButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 rounded-full bg-magenta px-6 py-3 font-poppins text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-magenta-dark hover:shadow-xl"
      >
        Unlock Success
      </button>
      <EmailCaptureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
