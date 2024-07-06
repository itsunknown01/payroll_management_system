import React from "react";
import { HomeIcon } from "lucide-react";
import {
  FaColumns,
  FaList,
  FaMoneyBill,
  FaThList,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { UserRole } from "@prisma/client";

interface SidebarLinkProps {
  route: string;
  icon: React.ElementType;
  title: string;
  role?: UserRole
}

export const SidebarLinks: SidebarLinkProps[] = [
  {
    route: "/",
    icon: HomeIcon,
    title: "Home",
  },
  {
    route: "/attendance",
    icon: FaList,
    title: "Attendance",
  },
  {
    route: "/payroll",
    icon: FaColumns,
    title: "Payroll List",
  },
  {
    route: "/employee",
    icon: FaUserTie,
    title: "Employee List",
  },
  {
    route: "/department",
    icon: FaThList,
    title: "Department List",
  },
  {
    route: "/position",
    icon: FaColumns,
    title: "Position List",
  },
  {
    route: "/allowance",
    icon: FaUserTie,
    title: "Allowance List",
  },
  {
    route: "/deduction",
    icon: FaMoneyBill,
    title: "Deduction List",
  },
  {
    route: "/users",
    icon: FaUser,
    title: "Users",
    role: UserRole.ADMIN
  },
];
