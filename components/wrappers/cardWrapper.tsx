import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <Card className={cn("max-w-[1070px] shadow-md flex", className)}>
      {children}
    </Card>
  );
};

export default CardWrapper;
