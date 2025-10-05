"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.isAdmin) {
        localStorage.removeItem("adminToken");
        router.replace("/login");
        return;
      }
      setUser(payload);
    } catch {
      localStorage.removeItem("adminToken");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  return { user, loading };
}
