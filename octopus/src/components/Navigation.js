import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex flex-col bg-gray-950 text-gray-50 p-4 gap-4">
      <nav className="flex flex-col gap-2">
        <Link
          className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-md"
          href="/"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        {/* <Link
          className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-md"
          href="/labour"
        >
          <UsersIcon className="h-5 w-5" />
          <span>Labour</span>
        </Link> */}
        <Link
          className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-md"
          href="/product-support"
        >
          <PackageIcon className="h-5 w-5" />
          <span>Product Support</span>
        </Link>
        {/* <Link
          className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-md"
          href="/cashflow"
        >
          <DollarSignIcon className="h-5 w-5" />
          <span>Cash Flow</span>
        </Link>
        <Link
          className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-md"
          href="/admin"
        >
          <AdminIcon className="h-5 w-5" />
          <span>Admin</span>
        </Link> */}
      </nav>
    </div>
  );
};

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function AdminIcon(props) {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87M3 21v-2a4 4 0 0 1 3-3.87M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

export default Navigation;
