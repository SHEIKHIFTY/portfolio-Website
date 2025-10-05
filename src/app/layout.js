// app/layout.js
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";


export const metadata = {
  title: "DOOM | Sheikh Ifty",
  description: "Portfolio of Sheikh Ifty, a Web Developer skills.",
};

export default function RootLayout({ children }) {
  return (
    <html className="light" lang="en">
      <body>

      <ThemeProvider  attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
       {children}
      </ThemeProvider>
      <Toaster />
              </body>
    </html>
  );
}
