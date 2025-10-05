"use client";
import React from "react";
import BannerManagementPage from "@/components/Banner/Banner";
import useAdminAuth from "@/hooks/UseAdminAuth";

export default function BannerPage() {
  const { user, loading } = useAdminAuth();

  if (loading) return <p className="p-8 text-center">Checking access...</p>;

  return <BannerManagementPage />;
}
