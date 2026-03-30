"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const CHATBOT_URL = "https://vsupport.it/chatbot-test/b2c6b29e-a7bc-4339-bcde-57eabae8d031";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const dialogTitleId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) buttonRef.current?.focus();
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={dialogTitleId}
          className="mb-3 w-[min(92vw,420px)] overflow-hidden rounded-lg border border-[#2C2420]/15 bg-[#EBD9D4] shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#2C2420]/10 px-4 py-3">
            <div className="min-w-0">
              <p
                id={dialogTitleId}
                className="truncate text-xs font-semibold uppercase tracking-wider text-[#2C2420]/80"
              >
                Chat
              </p>
              <p className="truncate text-[11px] text-[#2C2420]/60">
                Assistenza rapida
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md text-[#2C2420]/70 transition-colors hover:text-[#2C2420] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E]/70"
              aria-label="Chiudi chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-[min(62vh,520px)] bg-white">
            <iframe
              title="Chatbot La Vecia Mescola"
              src={CHATBOT_URL}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#2C2420]/15 bg-[#2C2420] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#EBD9D4] shadow-xl transition-colors hover:bg-[#3d3630] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8962E]/70"
        aria-expanded={open}
        aria-label={open ? "Chiudi chatbot" : "Apri chatbot"}
      >
        <MessageCircle size={16} />
        Chat
      </button>
    </div>
  );
}

