"use client";

import { BackButton } from "@/commons/components/auth/auth-back-button";
import { Header } from "@/commons/components/auth/auth-header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/commons/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card
      className="max-w-md sm:w-2/3 sh
  adow-md"
    >
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <hr />
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </div>
      </CardFooter>
    </Card>
  );
};
