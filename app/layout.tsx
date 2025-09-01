import type { Metadata } from "next";
import { montserrat, poppins } from "@/lib/utils/font";
import "../public/globals.css";
import Providers from "@/lib/providers/providers";
import { AuthProvider } from "@/lib/context/AuthContext";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import Modal from "@/components/UI/Modal"; // Import the Modal component
import { GlobalPageLoader } from "@/components/UI/Loading"; // Import the GlobalPageLoader

export const metadata: Metadata = {
  title: "NESA 2025",
  description: "New Education Standard Award Africa 2025",
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Optional: prevents zoom on mobile
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Providers>
            <LoadingProvider>
              <GlobalPageLoader /> {/* Global page loading spinner */}
              {children}
              <Modal /> {/* Render the Modal globally */}
            </LoadingProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}