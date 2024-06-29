"use client";

import { useState, useTransition } from "react";
import { ColumnDef } from "@tanstack/react-table";

import AttendanceFormModal from "@/components/forms/attendance/attendance-form-modal";
import {
  columns,
  AttendanceData,
} from "@/components/modals/attendance/columns";
import CellAction from "@/components/modals/attendance/cell-action";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { DialogFooter } from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { newAttendance } from "@/actions/attendance/new-attendance";
import { toast } from "react-toastify";

const CreateAttendanceModal = () => {
  const [loading, startTransition] = useTransition();

  const { type, isOpen, onClose } = useModal();
  const isModalOpen = isOpen && type == "createAttendance";

  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  const handleDelete = (id: number) => {
    const newData = [...attendanceData];
    newData.splice(id, 1);
    setAttendanceData(newData);
  };

  const newColumns: ColumnDef<AttendanceData>[] = [
    ...columns,
    {
      id: "action",
      cell: ({ row }) => (
        <CellAction onDelete={() => handleDelete(row.index)} />
      ),
      header: "Action",
    },
  ];

  const submitAttendance = () => {
    setAttendanceData([]);

    startTransition(() => {
      newAttendance(attendanceData)
        .then((data) => {
          toast.error(data.error);
          if (data.success) {
            toast.success(data.success);
            onClose();
          }
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <Modal
      title="New Time's Record"
      isOpen={isModalOpen}
      onClose={onClose}
      className="max-w-4xl"
    >
      <AttendanceFormModal
        attendanceData={attendanceData}
        setAttendanceData={setAttendanceData}
        loading={loading}
      />
      <Separator />
      <div className="px-6 w-[720px]">
        <DataTable
          data={attendanceData}
          searchkey="allowance"
          columns={newColumns}
        />
      </div>
      <DialogFooter className="bg-zinc-300 px-6 py-4">
        <Button disabled={loading} onClick={submitAttendance}>
          Save
        </Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </DialogFooter>
    </Modal>
  );
};

export default CreateAttendanceModal;
