import { motion } from "motion/react";
import { useEffect, useState } from "react";

const DOMAIN = "zaiware.ru";
const TYPE_SPEED = 120;
const DELETE_SPEED = 70;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 600;

export function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < DOMAIN.length) {
        timeout = setTimeout(() => setDisplayed(DOMAIN.slice(0, displayed.length + 1)), TYPE_SPEED);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(DOMAIN.slice(0, displayed.length - 1)), DELETE_SPEED);
      } else {
        setPhase("waiting");
      }
    } else {
      timeout = setTimeout(() => setPhase("typing"), PAUSE_AFTER_DELETE);
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase]);

  return (
    <div className="fixed inset-0 flex items-center justify-center select-none">
      <div
        className="flex items-center text-5xl sm:text-7xl tracking-widest"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: "#00ff41",
          textShadow: "0 0 8px #00ff41, 0 0 20px #00cc33, 0 0 40px #009922",
        }}
      >
        {displayed}
        <motion.span
          className="ml-2 inline-block w-[3px] sm:w-[4px] rounded-sm"
          style={{ height: "0.85em", background: "#00ff41", boxShadow: "0 0 8px #00ff41, 0 0 20px #00cc33" }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      </div>
    </div>
  );
}
