
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationMenuDemo } from "@/components/navigation-menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}><ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <nav className="absolute">
        <NavigationMenuDemo />
        </nav>
        {children}

      </ThemeProvider></body>
    </html>
  );
}
