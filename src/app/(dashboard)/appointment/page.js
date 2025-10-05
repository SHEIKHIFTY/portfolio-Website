"use client";
import React from "react";
import AppointmentPage from "@/components/appointment/appointmentpage";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function AppointmentDashboardPage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return (
    <div className="p-6">
      <AppointmentPage />
    </div>
  );
}
