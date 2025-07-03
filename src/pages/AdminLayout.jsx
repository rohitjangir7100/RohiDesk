// src/pages/AdminLayout.jsx
import React from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="md:pl-64">
      <AdminSidebar />
      <div className="p-6">{children}</div>
    </div>
  );
}
