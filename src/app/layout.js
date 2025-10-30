// app/layout.js
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "DOOM | Sheikh Ifty",
  description: "Portfolio of Sheikh Ifty, a Web Developer showcasing projects and skills.",
  keywords:
    "Sheikh Ifty, DOOM, Web Developer, Portfolio, Frontend Developer, React, Next.js, JavaScript, Tailwind CSS, Projects, Skills",
  authors: [{ name: "Sheikh Ifty" }],
  creator: "Sheikh Ifty",
  language: "en",
  metadataBase: new URL("https://sheikh-ifty.vercel.app/"), // ✅ change to your deployed portfolio URL
  // Open Graph
  openGraph: {
    title: "DOOM | Sheikh Ifty Portfolio",
    description:
      "Explore the portfolio of Sheikh Ifty, a passionate Web Developer specializing in modern web applications using React, Next.js, and Tailwind CSS.",
    url: "https://sheikh-ifty.vercel.app/",
    siteName: "DOOM | Sheikh Ifty",
    images: [
      {
        url: "https://sheikh-ifty.vercel.app/public/portfolio.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "DOOM | Sheikh Ifty Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DOOM | Sheikh Ifty Portfolio",
    description:
      "Portfolio of Sheikh Ifty, a Web Developer building modern web apps with React, Next.js, and Tailwind CSS.",
    images: ["https://sheikh-ifty.vercel.app/public/portfolio.png"], // same OG image
  },
  // Additional Meta Tags
  other: {
    language: "English",
    "theme-color": "#007bff",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="light" lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
