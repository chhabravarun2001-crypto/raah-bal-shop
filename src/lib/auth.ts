import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export function isGoogleAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET && process.env.AUTH_SECRET
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: isGoogleAuthConfigured() ? [Google] : [],
  pages: {
    signIn: "/account",
  },
  // With no providers configured, no session is ever issued or trusted, so
  // this placeholder just silences Auth.js's "missing secret" warning until
  // AUTH_SECRET is set alongside the real Google credentials.
  secret: process.env.AUTH_SECRET ?? "raah-bal-unconfigured-placeholder-secret",
});
