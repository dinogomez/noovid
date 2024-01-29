"use client";

import { Card, CardContent } from "@/commons/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CourierCardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-full">
      <CardContent className="mt-3">{children}</CardContent>
    </Card>
  );
};
