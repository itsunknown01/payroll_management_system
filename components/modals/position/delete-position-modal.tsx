"use client";

import { useTransition } from "react";

import { deletePosition } from "@/actions/position/delete-position";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import Modal from "@/components/ui/modal";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeletePositionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [loading, startTransition] = useTransition();
  const router = useRouter()

  const isModalOpen = isOpen && type == "deletePosition";
  const { position } = data;

  const handleConfirm = () => {
    startTransition(() => {
      deletePosition(position?.id).then((data) => {
        toast.error(data.error);
        toast.success(data.success);
      });
    });
    router.refresh();
    onClose();
  };
  
  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title="Delete Position">
      <div className="space-y-3 px-6 flex text-center flex-col">
        <h1>Are you sure to delete this columm or data?</h1>
        <DialogFooter className="py-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="destructive"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button type="button" disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </div>
    </Modal>
  );
};

export default DeletePositionModal;
