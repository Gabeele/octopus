import Image from "next/image";

const version = process.env.VERSION;

export function Topbar() {

    return (
          <header className="bg-gray-950 text-gray-50 px-4 py-2 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <Image src='logo.svg' width="24" height="24" />
              <span className="text-lg font-semibold">Octopus <span className="text-xs">{version}</span></span>
            </div>
            <div className="text-sm text-gray-400" />
          </header>
    )
}