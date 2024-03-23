import PositionClient from "@/components/layouts/position/client";
import { db } from "@/lib/db";
import React from "react";

const PositionPage = async () => {
  const departments = await db.department.findMany()

  const position = await db.position.findMany({
    include: { department: true },
  });

  const formattedData = position.map((item) =>({
    id: item.id,
    name: item.name,
    departmentName: item.department.name
  }))

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <PositionClient data={formattedData} departments={departments} />
      </div>
    </div>
  );
};

export default PositionPage;
