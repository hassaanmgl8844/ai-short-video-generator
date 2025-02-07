"use client"
import React from "react";
import Header from "./_component/Header";
import SideNav from "./_component/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";

function DashboardLayout({ children }) {
  return (
    <VideoDataContext.Provider value={{}}>
    <div>
      <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
        <SideNav />
      </div>
      <div>
        <Header />
        <div className="md:ml-64 p-10">{children}</div>
      </div>
    </div>
    </VideoDataContext.Provider>
  );
}

export default DashboardLayout;
