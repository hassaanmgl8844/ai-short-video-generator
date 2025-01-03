import React from "react";
import Header from "./_component/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
