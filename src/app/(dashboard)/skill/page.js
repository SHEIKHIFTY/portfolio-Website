"use client";
import React from "react";
import SkillPage from "@/components/skills/SkillPage";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function SkillDashboardPage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return (
    <div className="p-6">
      <SkillPage />
    </div>
  );
}
