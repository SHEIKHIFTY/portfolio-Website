"use client";
import React from "react";
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

export default function CreateServiceModal({ onCreated }) {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      projects: 0, // ✅ added
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      icon: Yup.string().required("Icon is required"),
      projects: Yup.number()
        .min(0, "Projects must be 0 or more")
        .required("Projects count is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/service-section", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values), // ✅ includes projects
        });

        if (res.ok) {
          resetForm();
          setOpen(false);
          onCreated();
        } else {
          const error = await res.json();
          console.error("Failed to create service:", error.message);
        }
      } catch (error) {
        console.error("Error creating service:", error);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          + Create Service
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
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
            <Label htmlFor="projects">Projects *</Label>
            <Input
              id="projects"
              name="projects"
              type="number"
              value={formik.values.projects}
              onChange={formik.handleChange}
              placeholder="Number of projects"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-primary text-white">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
