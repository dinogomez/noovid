import { Button } from "@/commons/components/ui/button";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";

interface LandingCardProps {
  title: string;
  desc: string;
  asChild?: boolean;
}

export default function CourierNav({ title, desc, asChild }: LandingCardProps) {
  return (
    <nav className="w-full px-6 bg-primary">
      <div className="flex justify-between items-center py-5 rounded-b-md flex-row w-full px-4  mx-auto ">
        <div className="w-full ">
          <h1 className="text-3xl flex flex-row items-center gap-x-2 text-white font-extrabold -skew-x-12 font-mono">
            {title}
            <TbTruckDelivery className="h-10 w-10" />
          </h1>
          <h1 className="text-gray-100 text-xs">{desc}</h1>
        </div>
        <div>
          {" "}
          <Link href="/">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
