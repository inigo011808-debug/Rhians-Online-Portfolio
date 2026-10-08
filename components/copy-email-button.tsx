"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/data";

/** Fallback for browsers/contexts without the async Clipboard API (e.g. plain http). */
function legacyCopy(text: string) {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(el);
  return ok;
}

export function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        ok = true;
      } else {
        ok = legacyCopy(email);
      }
    } catch {
      ok = legacyCopy(email);
    }
    setState(ok ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleCopy}
        className={className}
      >
        {state === "copied" ? <CheckIcon /> : <CopyIcon />}
        {state === "copied"
          ? CONTACT.copiedLabel
          : state === "failed"
            ? "Couldn't copy"
            : CONTACT.copyLabel}
      </Button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
