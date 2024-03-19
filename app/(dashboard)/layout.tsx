import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex h-full shadow-none w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
