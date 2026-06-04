import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  return {
    metadataBase: new URL(baseUrl),
    title: "Sound Walk — standortbasiertes Audioerlebnis",
    description: "Erkunde deine Umgebung bei einem immersiven Sound Walk. Entdecke an jedem Ort einzigartige Audioerlebnisse.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Sound Walk",
      description: "Standortbasiertes Audioerlebnis",
      images: ["/og-image.png"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className="min-h-screen bg-gray-950 text-white antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
