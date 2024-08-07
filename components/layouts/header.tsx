import Link from "next/link";

import { auth } from "@/services/next-auth/auth";
import UserAvatar from "../feature/user-avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const Header = async () => {
  const session = await auth();

  return (
    <Card className="flex items-center justify-between w-full rounded-none h-16 shadow-lg px-4 fixed">
      <Button variant="ghost" asChild>
        <Link href="/">Payroll Management System</Link>
      </Button>

      <div className="pr-8">
        <UserAvatar name={session?.user.name} image={session?.user.image} />
      </div>
    </Card>
  );
};

export default Header;
