import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import VideoIntro from "@/components/VideoIntro";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import RouteScrollRefresh from "@/components/RouteScrollRefresh";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart/CartContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAAH | BAL — Strength, Earned",
  description:
    "RAAH | BAL is a contemporary streetwear label built for the miles nobody's watching. Matter 12 is coming.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <head>
        <link rel="preload" as="video" type="video/mp4" href="/videos/intro.mp4" />
      </head>
      <body>
        <CartProvider>
          <VideoIntro />
          <Preloader />
          <div className="grain" aria-hidden />
          <ScrollProgress />
          <PageTransition />
          <RouteScrollRefresh />
          <Nav />
          {children}
          <Footer />
          <ScrollToTop />
          <CookieBanner />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
