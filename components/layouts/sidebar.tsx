"use client";

import React from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SidebarLinks } from "@/routes/sidebarLinks";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <Card className="h-full rounded-none w-80">
      <div className="flex py-2 flex-col gap-3 my-20">
        {SidebarLinks.map((link) => (
          <Button
            className={cn(
              "w-full rounded-none text-left justify-start",
              link.route == pathname ? "bg-zinc-200" : ""
            )}
            variant="ghost"
            asChild
            key={link.route}
          >
            <Link href={link.route} className="text-center">
              <link.icon className="w-4 h-4 ml-2" />
              <span className="p-2 text-base font-normal">{link.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default Sidebar;
