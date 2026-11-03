import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { portfolioEasing } from "@/lib/motion";

/** Counts a figure like "+25%" or "−30%" up from zero once it scrolls into view. Non-numeric values render as-is. */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^([+−-]?)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const target = match ? parseFloat(match[2]) : 0;
  const [n, setN] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!match || !inView || reduced) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: portfolioEasing,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, target]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="inline-flex items-baseline">
      {match[1] === "+" && <ArrowUp aria-label="Up" className="mr-0.5 h-[0.7em] w-[0.7em] self-center" strokeWidth={2.75} />}
      {(match[1] === "−" || match[1] === "-") && (
        <ArrowDown aria-label="Down" className="mr-0.5 h-[0.7em] w-[0.7em] self-center" strokeWidth={2.75} />
      )}
      {n}
      {match[3]}
    </span>
  );
}
