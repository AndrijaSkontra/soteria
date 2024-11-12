"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function DarkModeButton() {
  const [theme, setIsTheme] = useState(true);
  function switchThemeMode() {
    if (!(typeof document === "undefined")) {
      if (theme) {
        document.documentElement.classList.add("dark");
        setIsTheme(false);
      } else {
        document.documentElement.classList.remove("dark");
        setIsTheme(true);
      }
    }
  }
  return <Button onClick={switchThemeMode}>toggle</Button>;
}
