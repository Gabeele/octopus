import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Octopus | Battery Wholesale Utility App",
  description: "Octopus is a battery wholesale utility app that helps you manage your battery inventory, warranty, time schedules, and more.",
  keywords: "battery, utility, wholesale, inventory, warranty, schedule, app",
};

const version = process.env.version;

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="bg-gray-950">
        <div className="flex min-h-screen w-full flex-col bg-gray-950">
          <header className="bg-gray-950 text-gray-50 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src='logo.svg' width="24" height="24" />
              <span className="text-lg font-semibold">Octopus <span className="text-xs">{version}</span></span>
            </div>
            <div className="text-sm text-gray-400" />
          </header>
          <div className="flex h-full">
            <Navigation />
            <div className="flex-1 bg-gray-100 dark:bg-gray-950 p-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
