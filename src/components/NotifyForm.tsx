"use client";

import { useState, FormEvent, CSSProperties } from "react";
import Magnetic from "./Magnetic";

type NotifyFormProps = {
  source: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonLabel?: string;
  successLabel?: string;
  placeholder?: string;
  sweepStyle?: CSSProperties;
};

export default function NotifyForm({
  source,
  className,
  inputClassName,
  buttonClassName,
  buttonLabel = "Join the list →",
  successLabel = "YOU'RE ON THE LIST.",
  placeholder = "Enter your email",
  sweepStyle,
}: NotifyFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string) ?? "";

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className={`font-mono text-xs tracking-[0.2em] ${className ?? ""}`}>{successLabel}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-md flex-col gap-3 sm:flex-row ${className ?? ""}`}>
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        aria-label="Email address"
        className={`w-full flex-1 border-b bg-transparent px-1 py-3 text-sm outline-none placeholder:opacity-50 ${inputClassName ?? ""}`}
      />
      <Magnetic className="w-fit">
        <button
          type="submit"
          data-hover
          disabled={status === "loading"}
          style={sweepStyle}
          className={`btn-sweep w-fit shrink-0 whitespace-nowrap px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] disabled:opacity-50 ${buttonClassName ?? ""}`}
        >
          {status === "loading" ? "Sending..." : buttonLabel}
        </button>
      </Magnetic>
      {status === "error" && <p className="font-mono text-[11px] text-ember">Something went wrong. Please try again.</p>}
    </form>
  );
}
