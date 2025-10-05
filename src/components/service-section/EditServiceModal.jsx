"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditServiceModal({ service, onUpdated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: service?.name || "",
      icon: service?.icon || "",
      projects: service?.projects ?? 0, // ✅ added projects field
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      icon: Yup.string().required("Icon is required"),
      projects: Yup.number()
        .min(0, "Projects cannot be negative")
        .required("Projects is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`/api/service-section?id=${service._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          onUpdated();
          setOpen(false);
        } else {
          console.error("❌ Update failed:", await res.text());
        }
      } catch (error) {
        console.error("❌ Error updating service:", error);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter service name"
            />
          </div>

          {/* Icon */}
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon URL *</Label>
            <Input
              id="icon"
              name="icon"
              value={formik.values.icon}
              onChange={formik.handleChange}
              placeholder="Enter icon image URL"
            />
          </div>

          {/* Projects */}
          <div className="grid gap-2">
            <Label htmlFor="projects">Completed Projects *</Label>
            <Input
              id="projects"
              name="projects"
              type="number"
              min="0"
              value={formik.values.projects}
              onChange={formik.handleChange}
              placeholder="Enter number of completed projects"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-primary text-white">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
