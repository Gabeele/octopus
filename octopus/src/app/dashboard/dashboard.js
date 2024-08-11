import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BoxIcon } from "lucide-react";

export default function Dashboard() {
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
    <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 ">
      {cards.map((card, index) => (
        <div
          key={index}
          className=" rounded-lg shadow-lg border border-gray-300  p-6 flex flex-col items-center justify-center hover:scale-105 transition-all ease-in-out duration-200"
        >
          {card.icon}
          <h3 className="text-xl font-bold mt-4">{card.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            {card.description}
          </p>
          <Link href={card.link}>
            <Button className="mt-4">{card.button}</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
