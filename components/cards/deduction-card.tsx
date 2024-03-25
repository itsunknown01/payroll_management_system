"use client";

import { Delete, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

const data = [
  {
    name: "John Doe",
    email: "john@example.com",
  },
  {
    name: "Rohan Doe",
    email: "rohan@example.com",
  },
];

const DeductionCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between bg-zinc-100">
        <CardTitle className="text-md">Deductions</CardTitle>
        <CardDescription>
          <Button className="p-0 px-2">
            <Plus className="w-4 h-4" />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="mt-4 w-full flex flex-col items-center justify-center px-6 py-4 gap-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between gap-y-4"
            >
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold">{item.name}</h1>
                <p className=" text-muted-foreground text-sm">{item.email}</p>
              </div>
              <Button>
                <Delete className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </Card>
      </CardContent>
    </Card>
  );
};

export default DeductionCard;
