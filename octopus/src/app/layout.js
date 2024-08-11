import "./globals.css";
import Navigation from "@/components/Navigation";
import { Topbar } from "@/components/Topbar";

export const metadata = {
  title: "Octopus | Battery Wholesale Utility App",
  description: "Octopus is a battery wholesale utility app that helps you manage your battery inventory, warranty, time schedules, and more.",
  keywords: "battery, utility, wholesale, inventory, warranty, schedule, app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="flex flex-col min-h-screen">
        <div className="w-full sticky top-0 z-10">
          <Topbar />
        </div>

        <div className="flex flex-1 min-h-screen overflow-hidden">
          <div className="max-w-64 bg-gray-800 flex-shrink-0">
            <Navigation />
          </div>
          <div className="flex-1 min-h-full p-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
