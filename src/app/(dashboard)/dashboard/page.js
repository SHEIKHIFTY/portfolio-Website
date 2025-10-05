"use client";
import useAdminAuth from "@/hooks/UseAdminAuth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // clear token
    router.push("/login"); // redirect back to login
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome {user?.email}</h1>
      <p className="mt-2">This is your admin dashboard 🎉</p>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
