import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
  );
};

export default Modal;
