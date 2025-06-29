"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Appbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loader to avoid flickering
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight flex items-center gap-1 text-gray-800 dark:text-white hover:underline"
      >
        <span className="text-blue-600 cursor-pointer">Net</span>
        <span className="cursor-pointer">Sentinel</span>
      </Link>

      <div className="flex gap-4 items-center">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(currentTheme === "dark" ? "light" : "dark")
          }
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle Dark Mode"
        >
          {currentTheme === "dark" ? (
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </Button>

        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
}
