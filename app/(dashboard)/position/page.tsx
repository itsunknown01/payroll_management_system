import PositionClient from "@/components/layouts/position/client";
import { PositionColumn } from "@/components/layouts/position/column";
import { db } from "@/lib/db";
import { auth } from "@/services/next-auth/auth";
import React from "react";

const PositionPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const departments = await db.department.findMany({
    where: {
      userId,
    },
  });

  const position = await db.position.findMany({
    where: {
      userId,
    },
    include: { department: true },
  });

  const formattedData: PositionColumn[] = position.map((item) => ({
    id: item.id,
    userId: item.userId,
    name: item.name,
    departmentId: item.departmentId,
    departmentName: item.department.name,
  }));

  const data = {
    departments,
    position: formattedData,
  };

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <PositionClient data={data} />
      </div>
    </div>
  );
};

export default PositionPage;
