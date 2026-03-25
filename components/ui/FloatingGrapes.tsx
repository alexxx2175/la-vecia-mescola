"use client";

import { motion } from "framer-motion";

function GrapeCluster({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 80"
      className={className}
      fill="currentColor"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <ellipse cx="20" cy="25" rx="8" ry="9" />
      <ellipse cx="35" cy="22" rx="7" ry="8" />
      <ellipse cx="45" cy="28" rx="6" ry="7" />
      <ellipse cx="15" cy="38" rx="7" ry="8" />
      <ellipse cx="28" cy="40" rx="8" ry="9" />
      <ellipse cx="42" cy="38" rx="7" ry="8" />
      <ellipse cx="22" cy="52" rx="6" ry="7" />
      <ellipse cx="35" cy="55" rx="7" ry="8" />
      <path
        d="M32 58 Q32 75 32 78"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function VineLeaf({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 80 50"
      className={className}
      fill="currentColor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <path
        d="M40 5 Q5 15 5 25 Q5 35 15 42 Q25 48 40 45 Q55 42 75 30 Q80 20 75 10 Q65 2 40 5 Z"
        strokeWidth="0.5"
        stroke="currentColor"
        fill="currentColor"
      />
    </motion.svg>
  );
}

export function FloatingGrapes() {
  return (
    <div className="glitter-particles pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* Grappoli e foglie — posizionati in vari punti, animati con float */}
      <motion.div
        className="absolute left-[8%] top-[15%] text-gold/50"
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <GrapeCluster className="h-16 w-12" />
      </motion.div>

      <motion.div
        className="absolute right-[12%] top-[25%] text-gold/45"
        animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <VineLeaf className="h-20 w-32" />
      </motion.div>

      <motion.div
        className="absolute left-[15%] top-[55%] text-gold/40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <VineLeaf className="h-16 w-24 scale-x-[-1]" />
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[60%] text-gold/50"
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <GrapeCluster className="h-14 w-10" />
      </motion.div>

      <motion.div
        className="absolute left-[5%] top-[80%] text-gold/45"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <VineLeaf className="h-14 w-20" />
      </motion.div>

      <motion.div
        className="absolute right-[18%] top-[85%] text-gold/50"
        animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <GrapeCluster className="h-12 w-9" />
      </motion.div>

      <motion.div
        className="absolute left-[85%] top-[40%] text-gold/40"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <VineLeaf className="h-18 w-28 scale-x-[-1]" />
      </motion.div>
    </div>
  );
}
