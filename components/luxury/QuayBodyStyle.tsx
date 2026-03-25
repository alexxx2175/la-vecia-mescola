"use client";

import { useEffect } from "react";

export function QuayBodyStyle() {
  useEffect(() => {
    document.body.style.background = "#EBD9D4";
    document.body.style.color = "#2C2420";
    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, []);

  return null;
}
