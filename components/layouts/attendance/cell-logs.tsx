"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Trash } from "lucide-react";
import { Button } from "../../ui/button";

interface CellLogsProps {
  attendance: any;
}

const CellLogs = ({ attendance }: CellLogsProps) => {
  const { onOpen } = useModal();
  return (
    <div className="space-y-2">
      {attendance.logTime?.map((log, index) => (
        <div className="flex items-center justify-between" key={index}>
          <span className="text-sm text-gray-800">{log.type}</span>
          <span className="text-sm text-gray-600">{log.time}</span>
          <Button
            onClick={() => onOpen("deleteEmployee", { attendance })}
            variant="destructive"
            className="px-4 py-2"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CellLogs;
