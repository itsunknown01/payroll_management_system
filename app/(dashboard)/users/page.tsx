import UsersClient from "@/components/layouts/users/client";
import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return redirect("/");
  }

  const users = await db.user.findMany();

  const formattedData = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    role: user.role,
    password: user.password,
  }));

  return (
    <div className="w-full">
      <div className="flex-2 space-y-2 pt-6 p-8 w-full">
        <UsersClient data={formattedData} />
      </div>
    </div>
  );
}
