"use client";
import React from "react";
import EducationPage from "@/components/education/EducationPage";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function EducationDashboardPage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return (
    <div className="p-6">
      <EducationPage />
    </div>
  );
}
