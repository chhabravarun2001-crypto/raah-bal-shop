import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { auth, isGoogleAuthConfigured } from "@/lib/auth";
import { googleSignIn, userSignOut } from "./actions";
import Reveal from "@/components/Reveal";
import { IconGoogle } from "@/components/icons";

export const metadata: Metadata = {
  title: "Account · RAAH | BAL",
  description: "Sign in to RAAH | BAL to save your bag, track orders and get first access to future drops.",
};

export default async function AccountPage() {
  const session = await auth();
  const configured = isGoogleAuthConfigured();

  return (
    <main data-nav-theme="light" className="min-h-screen bg-paper px-6 pb-24 pt-28 text-ink sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-lg">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          ACCOUNT
        </Reveal>
        <Reveal
          as="h1"
          variant="up"
          delay={0.05}
          className="mt-3 font-display text-4xl uppercase leading-[0.95] sm:text-5xl"
        >
          {session ? "Welcome back" : "Sign in"}
        </Reveal>

        {session ? (
          <Reveal variant="up" delay={0.1} className="mt-10">
            <div className="flex items-center gap-4 border border-ink/10 p-5">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "Account"}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-display text-lg uppercase">{session.user?.name}</p>
                <p className="font-mono text-xs text-ink/50">{session.user?.email}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">Orders</h2>
              <p className="mt-3 text-sm text-ink/60">
                No orders yet. Your history will show up here the moment your first piece ships.
              </p>
            </div>

            <form action={userSignOut} className="mt-10">
              <button
                type="submit"
                data-hover
                className="link-draw font-mono text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
              >
                Sign out
              </button>
            </form>
          </Reveal>
        ) : (
          <Reveal variant="up" delay={0.1} className="mt-10">
            <p className="mb-6 text-sm text-ink/60">
              Sign in to save your bag, track orders and get first access to future drops.
            </p>
            {configured ? (
              <form action={googleSignIn}>
                <button
                  type="submit"
                  data-hover
                  style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
                  className="btn-stamp flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper"
                >
                  <IconGoogle className="h-4 w-4" />
                  Continue with Google
                </button>
              </form>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-3 border border-ink/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink/40"
              >
                <IconGoogle className="h-4 w-4 opacity-40" />
                Google sign-in: connecting soon
              </button>
            )}
          </Reveal>
        )}
      </div>
    </main>
  );
}
