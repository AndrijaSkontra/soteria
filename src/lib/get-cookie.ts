"use client";

export function getCookie(name: string): string | null {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
  } else {
    return null;
  }
  return null;
}
