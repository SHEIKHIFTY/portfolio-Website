"use client";
import { LazyMotion, domAnimation } from "motion/react";

export default function MotionProvider({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
