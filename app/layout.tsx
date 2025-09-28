import type { Metadata } from "next";
import { montserrat, poppins } from "@/lib/utils/font";
import "../public/globals.css";
import Providers from "@/lib/providers/providers";
import { AuthProvider } from "@/lib/context/AuthContext";
// import {AuthProvider} from "@/components/Context/AuthContext";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import Modal from "@/components/UI/Modal"; // Import the Modal component
import { GlobalPageLoader } from "@/components/UI/Loading"; // Import the GlobalPageLoader

export const metadata: Metadata = {
  title: "NESA 2025",
  description: "New Education Standard Award Africa 2025",
  other: {
    'X-UA-Compatible': 'IE=edge',
    'format-detection': 'telephone=no',
  }
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Optional: prevents zoom on mobile
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Add a script to detect Edge and apply specific fixes
  const edgeDetectionScript = `
    (function() {
      // More comprehensive Edge detection
      if (
        navigator.userAgent.indexOf('Edg') !== -1 || 
        navigator.userAgent.indexOf('Edge') !== -1 ||
        (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1)
      ) {
        document.documentElement.classList.add('edge-browser');
        
        // Load Edge-specific stylesheets
        var edgeStylesheet = document.createElement('link');
        edgeStylesheet.rel = 'stylesheet';
        edgeStylesheet.href = '/edge-only.css';
        edgeStylesheet.id = 'edge-specific-styles';
        document.head.appendChild(edgeStylesheet);
        
        var edgeNavbarStylesheet = document.createElement('link');
        edgeNavbarStylesheet.rel = 'stylesheet';
        edgeNavbarStylesheet.href = '/edge-navbar.css';
        edgeNavbarStylesheet.id = 'edge-navbar-styles';
        document.head.appendChild(edgeNavbarStylesheet);
        
        var edgeNavbarFixStylesheet = document.createElement('link');
        edgeNavbarFixStylesheet.rel = 'stylesheet';
        edgeNavbarFixStylesheet.href = '/edge-navbar-fix.css';
        edgeNavbarFixStylesheet.id = 'edge-navbar-fix-styles';
        document.head.appendChild(edgeNavbarFixStylesheet);
        
        var edgeSpacingStylesheet = document.createElement('link');
        edgeSpacingStylesheet.rel = 'stylesheet';
        edgeSpacingStylesheet.href = '/edge-spacing.css';
        edgeSpacingStylesheet.id = 'edge-spacing-styles';
        document.head.appendChild(edgeSpacingStylesheet);
        
        var edgeExactMatchStylesheet = document.createElement('link');
        edgeExactMatchStylesheet.rel = 'stylesheet';
        edgeExactMatchStylesheet.href = '/edge-exact-match.css';
        edgeExactMatchStylesheet.id = 'edge-exact-match-styles';
        document.head.appendChild(edgeExactMatchStylesheet);
        
        // Add inline styles for critical Edge fixes that can't wait for CSS loading
        var style = document.createElement('style');
        style.textContent = \`
          /* Critical Edge fixes applied directly */
          .dropdown {
            background-color: rgba(23, 18, 10, 0.95) !important;
            -webkit-backdrop-filter: none !important;
            backdrop-filter: none !important;
          }
          
          .nav-item:hover .dropdown {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
          }
          
          .dropdown-item:hover {
            background: rgba(234, 88, 12, 0.3) !important;
            color: #fbbf24 !important;
            transform: translateX(4px) !important;
          }
          
          .nav-item:hover .dropdown-chevron svg {
            transform: rotate(180deg) !important;
          }
          
          /* Force hardware acceleration */
          .dropdown, .nav-item, .dropdown-item {
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
          }
        \`;
        document.head.appendChild(style);
        
        // Add a class to body after a short delay to ensure all styles are applied
        setTimeout(function() {
          document.body.classList.add('edge-ready');
        }, 100);
      }
    })();
  `;

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: edgeDetectionScript }} />
      </head>
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