"use client";

import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  // Respect the OS "reduce motion" setting for every motion component.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
