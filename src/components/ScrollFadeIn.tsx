"use client";
import { useEffect, useRef } from "react";

export default function ScrollFadeIn() {
  const ref = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    ref.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      ref.current?.observe(el);
    });

    return () => ref.current?.disconnect();
  }, []);

  return null;
}
