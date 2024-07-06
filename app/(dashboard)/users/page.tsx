import UsersClient from "@/components/layouts/users/client";
import { db } from "@/lib/db";

export default async function UsersPage() {
  const users = await db.user.findMany();

  const formattedData = users.map((user,index) => ({
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
