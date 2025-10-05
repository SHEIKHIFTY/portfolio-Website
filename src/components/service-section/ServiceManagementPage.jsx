"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateServiceModal from "@/components/service-section/CreateServiceModal";
import EditServiceModal from "@/components/service-section/EditServiceModal";

export default function ServiceManagementPage() {
  const [services, setServices] = useState([]);

  // Fetch services with no cache
  const fetchServices = async () => {
    try {
      const res = await fetch("/api/service-section", { cache: "no-store" });
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Delete service
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/service-section?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchServices(); // Refresh table
      } else {
        console.error("Failed to delete service:", await res.text());
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
        <CreateServiceModal onCreated={fetchServices} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Services</CardTitle>
          </CardHeader>
          <CardContent>{services.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            {services.filter((s) => s.status).length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inactive Services</CardTitle>
          </CardHeader>
          <CardContent>
            {services.filter((s) => !s.status).length}
          </CardContent>
        </Card>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-10 h-10 rounded"
                    />
                  </TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    <span className="font-medium text-blue-600">
                      {service.projects ?? 0} Completed
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <EditServiceModal
                      service={service}
                      onUpdated={fetchServices}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No services found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
