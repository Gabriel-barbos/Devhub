
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationMenuDemo } from "@/components/navigation-menu";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}><ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <nav className="absolute p-2">
        {/* <NavigationMenuDemo /> */}
        </nav>
        {children}
        <Toaster />
      </ThemeProvider>
     
      </body>
    </html>
  );
}
