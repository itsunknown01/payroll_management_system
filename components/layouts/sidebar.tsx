import React from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SidebarLinks } from "@/routes/sidebarLinks";

const Sidebar = () => {
  return (
    <Card className="h-full rounded-none w-[27rem]">
      <div className="flex py-2 flex-col gap-3">
        {SidebarLinks.map((link) => (
          <Button
            className="w-full rounded-none text-left justify-start"
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
