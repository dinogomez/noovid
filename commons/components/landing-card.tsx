import { Button } from "@/commons/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/commons/components/ui/card";
import { courierConfig, loginConfig } from "@/commons/config";
import Link from "next/link";

interface LandingCardProps {
  title: string;
  desc: string;
  asChild?: boolean;
}

export default function LandingCard({
  title,
  desc,
  asChild,
}: LandingCardProps) {
  return (
    <Card className="max-w-md w-full shadow-lg">
      <CardHeader className="bg-primary items-center text-white rounded-t-md">
        <CardTitle className="text-3xl font-semibold -skew-x-12 font-mono ">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300 text-xs">
          {desc}
        </CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="text-center mt-3">Select Platform</CardContent>
      <CardFooter>
        <div className="flex w-full gap-x-2">
          <Link className="w-full" href={loginConfig.route}>
            <Button variant="outline" className="w-full">
              User
            </Button>
          </Link>
          <Link className="w-full" href={courierConfig.route}>
            <Button variant="outline" className="w-full">
              Courier
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
