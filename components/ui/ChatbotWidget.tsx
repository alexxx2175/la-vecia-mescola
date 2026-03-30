"use client";

import Script from "next/script";

const CHATBOT_ID = "b2c6b29e-a7bc-4339-bcde-57eabae8d031";
const WIDGET_SRC = `https://jzgtzkfxkrgnibbjusip.supabase.co/functions/v1/chatbot-widget?id=${CHATBOT_ID}`;

declare global {
  interface Window {
    chatWidget?: (...args: unknown[]) => void;
    openChatbot?: () => void;
  }
}

export function openChatbot() {
  if (typeof window !== "undefined") {
    window.chatWidget?.("open");
  }
}

export function ChatbotWidget() {
  return (
    <Script
      id="vsupport"
      src={WIDGET_SRC}
      strategy="lazyOnload"
      onLoad={() => {
        window.openChatbot = openChatbot;
      }}
    />
  );
}
