// app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import MotionProvider from "./motion-provider"; // ✅ Framer Motion provider
import CurserSmoke from "../components/CurserSmoke"; // ✅ Import cursor smoke

export const metadata = {
  title: "DOOM | Sheikh Ifty",
  description: "Portfolio of Sheikh Ifty, a Web Developer skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#111111] text-[#f5f5f5] font-inter flex flex-col min-h-screen relative overflow-hidden">
        {/* 🔥 Cursor Smoke Animation */}
        <CurserSmoke />

        <MotionProvider>
          {/* Navbar always at top */}
          <Navbar />

          {/* Page content grows to fill space */}
          <main className="flex-grow">{children}</main>

          {/* GetInTouch section */}
          <GetInTouch />

          {/* Footer always at bottom */}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
