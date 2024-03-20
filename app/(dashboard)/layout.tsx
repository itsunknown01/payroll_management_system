import React from "react";

import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import ModalProvider from "@/components/providers/modal-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex h-full shadow-none w-full">
        <Sidebar />
        <ModalProvider />
        <div className="mt-16 w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;