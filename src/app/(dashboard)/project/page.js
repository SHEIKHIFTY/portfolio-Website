"use client";
import React from "react";
import ProjectPage from "@/components/project/Projectpage";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function ProjectDashboardPage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return <ProjectPage />;
}
