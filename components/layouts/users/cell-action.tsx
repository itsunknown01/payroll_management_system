import React from "react";
import { UserColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const CellAction = ({ data }: { data: UserColumn }) => {
  const { onOpen } = useModal();

  return (
    <div className="flex gap-2">
      <Button onClick={() => onOpen("editUser", { user: data })}>Edit</Button>
      <Button
        onClick={() => onOpen("deleteUser", { user: data })}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
