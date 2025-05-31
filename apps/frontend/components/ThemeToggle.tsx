// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
 
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</button>
  );
}
