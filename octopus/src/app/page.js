import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BoxIcon } from "lucide-react";
import Dashboard from "./dashboard/dashboard";

export default function Home() {
  const cards = [
    {
      title: "Product Support",
      description: "Process a return, warranty, recharge, or new product.",
      link: "/product-support",
      button: "Add Product",
      icon: <BoxIcon className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <main >
      <Dashboard />
    </main>
  );
}
