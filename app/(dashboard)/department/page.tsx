import DepartmentClient from "@/components/layouts/department/client";
import { db } from "@/lib/db";
import { auth } from "@/services/next-auth/auth";

const DepartmentPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const departments = await db.department.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <DepartmentClient data={departments} />
      </div>
    </div>
  );
};

export default DepartmentPage;
