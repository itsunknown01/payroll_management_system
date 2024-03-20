import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import ModalProvider from "@/components/providers/modal-provider";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <ModalProvider />
      <Header />
      <div className="flex h-full shadow-none w-full">
        <Sidebar />
        <div className="mt-16 w-full">
        {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
