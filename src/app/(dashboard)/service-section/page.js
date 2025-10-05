"use client";
import React from "react";
import ServiceManagementPage from "@/components/service-section/ServiceManagementPage";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function ServicePage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return <ServiceManagementPage />;
}
