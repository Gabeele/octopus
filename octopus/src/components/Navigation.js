'use server'
import React from "react";
import Link from "next/link";
import { BoxIcon, HomeIcon } from "lucide-react";

const Navigation = () => {
  const items = [
    {
      title: "Dashboard",
      link: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      title: "Product Support",
      link: "/product-support",
      icon: <BoxIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col bg-gray-950 text-gray-50 p-4 gap-4  h-screen md:w-64 fixed z-10 shadow-md">
      <nav className="flex flex-col gap-2">
        {items.map((item, index) => (
          <Link
            key={index}
            className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-md duration-200 ease-out hover:ease-in"
            href={item.link}
          >
            <span className="icon">{item.icon}</span>
            <span className="title hidden  md:inline">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
