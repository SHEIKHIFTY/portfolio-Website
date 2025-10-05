"use client";
import React from "react";
import Experience from "@/components/experience-section/ExperienceManagementPage";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function ExperiencePage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return <Experience />;
}
