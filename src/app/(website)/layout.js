// app/layout.js
import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion-provider"; // ✅ Framer Motion provider
import CurserSmoke from "@/components/CurserSmoke"; // ✅ Import cursor smoke


export default function RootLayout({ children }) {
  return (
      <main className="bg-[#111111] text-[#f5f5f5] font-inter flex flex-col min-h-screen relative overflow-hidden">
        {/* 🔥 Cursor Smoke Animation */}
        <CurserSmoke />

        <MotionProvider>
          {/* Navbar always at top */}
          <Navbar />

          {/* Page content grows to fill space */}
          <div className="flex-grow">{children}</div>

        

          {/* Footer always at bottom */}
          <Footer />
        </MotionProvider>
      </main>
  );
}
