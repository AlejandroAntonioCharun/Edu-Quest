import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { Outlet } from "react-router-dom";
import React from "react";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 bg-[#f8f9fc] min-h-screen">
        <Topbar />
        <main className="p-8">{children ? children : <Outlet />}</main>
      </div>
    </div>
  );
}
