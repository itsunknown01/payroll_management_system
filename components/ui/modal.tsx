import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  className
}: ModalProps) => {
  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className={cn("bg-white text-black p-0 overflow-hidden w-full", className)}>
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
