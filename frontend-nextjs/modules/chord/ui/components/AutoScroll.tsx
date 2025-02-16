"use client";

import React, { useEffect, useRef } from "react";

interface AutoScrollProps {
  children: React.ReactNode;
}

export const AutoScroll = ({ children }: AutoScrollProps) => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    const element = document.getElementById("printable-content");
    if (!element) return;

    const scrollToBottom = () => {
      const scrollHeight = element.scrollHeight;
      let currentPosition = 0;

      const scroll = () => {
        currentPosition += 1; // Sesuaikan kecepatan scroll di sini
        if (currentPosition >= scrollHeight) {
          currentPosition = 0;
        }
        element.scrollTop = currentPosition;
      };

      scrollRef.current = setInterval(scroll, 50);
    };

    scrollToBottom();

    // Cleanup interval saat komponen unmount
    return () => {
      if (scrollRef.current) {
        clearInterval(scrollRef.current);
      }
    };
  }, []);

  // Event handlers untuk pause saat hover
  const handleMouseEnter = () => {
    if (scrollRef.current) {
      clearInterval(scrollRef.current);
    }
  };

  const handleMouseLeave = () => {
    const element = document.getElementById("printable-content");
    if (!element) return;

    let currentPosition = element.scrollTop;

    scrollRef.current = setInterval(() => {
      currentPosition += 1; // Sesuaikan kecepatan scroll di sini
      if (currentPosition >= element.scrollHeight) {
        currentPosition = 0;
      }
      element.scrollTop = currentPosition;
    }, 50);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
