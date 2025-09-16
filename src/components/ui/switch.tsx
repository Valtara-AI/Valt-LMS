"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // base sizing and behavior
        "peer inline-flex h-[1.25rem] w-9 shrink-0 items-center rounded-full transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
  // light mode unchecked/checked using design tokens
  `data-[state=unchecked]:bg-[var(--toggle-track-light)] data-[state=checked]:bg-[var(--toggle-track-checked)]`,
        // visible border and subtle focus ring
        "border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] focus-visible:ring-4 focus-visible:ring-accent/20",
        // dark mode unchecked/checked with clearer contrast
  `dark:data-[state=unchecked]:bg-[var(--toggle-track-dark)] dark:data-[state=unchecked]:border-[rgba(255,255,255,0.08)]`,
  `dark:data-[state=checked]:bg-[var(--toggle-track-checked)]`,
        // subtle shadow to lift it off the background
  "shadow-sm dark:shadow-md",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block w-4 h-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
          // thumb color driven by design token
          "bg-[var(--toggle-thumb-color)]",
          // subtle shadow to make the thumb pop
          "shadow",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

