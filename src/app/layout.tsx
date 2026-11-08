import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/layout/AppProviders";
import { AnnouncementBar } from "@/components/organisms/AnnouncementBar";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { MobileMenu } from "@/components/organisms/MobileMenu";
import { SearchOverlay } from "@/components/organisms/SearchOverlay";
import { ConciergeWidget } from "@/components/concierge/ConciergeWidget";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { QuickViewModal } from "@/components/organisms/QuickViewModal";
import { Toaster } from "@/components/organisms/Toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Solenne Fine Jewelry — Jewelry That Becomes Your Story",
    template: "%s · Solenne Fine Jewelry",
  },
  description:
    "Timeless fine jewelry in 18K gold and platinum, with a personal concierge to guide you to the perfect piece.",
  openGraph: {
    title: "Solenne Fine Jewelry",
    description:
      "Discover timeless pieces, thoughtfully selected for every chapter of your life.",
    type: "website",
    images: ["/images/editorial/hero-drape.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F6F1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <AppProviders>
          <a
            href="#main"
            className="sr-only z-[100] bg-espresso px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileMenu />
          <SearchOverlay />
          <QuickViewModal />
          <ConciergeWidget />
          <CartDrawer />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
