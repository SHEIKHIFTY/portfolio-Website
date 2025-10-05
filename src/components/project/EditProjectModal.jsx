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

export default function EditProjectModal({ project, onUpdated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: project.image || "",
      name: project.name || "",
      technology: project.technology?.join(", ") || "",
      url: project.url || "",
      status: project.status || true,
      feature: project.feature || false,
      service: project.service || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      image: Yup.string().required("Image URL is required"),
      name: Yup.string().required("Project Name is required"),
      technology: Yup.string().required("Technology is required"),
      url: Yup.string().required("URL is required"),
      service: Yup.string().required("Service is required"),
    }),
    onSubmit: async (values) => {
      try {
        const body = { ...values, technology: values.technology.split(",").map(t => t.trim()) };
        const res = await fetch(`/api/project?id=${project._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          setOpen(false);
          onUpdated();
        } else {
          console.error("Update failed:", data.message);
        }
      } catch (err) {
        console.error("Error updating project:", err);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input id="image" name="image" value={formik.values.image} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="technology">Technology (comma separated) *</Label>
            <Input id="technology" name="technology" value={formik.values.technology} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">Project URL *</Label>
            <Input id="url" name="url" value={formik.values.url} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="service">Service *</Label>
            <Input id="service" name="service" value={formik.values.service} onChange={formik.handleChange} />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="status"
                checked={formik.values.status}
                onChange={() => formik.setFieldValue("status", !formik.values.status)}
              />
              Active
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="feature"
                checked={formik.values.feature}
                onChange={() => formik.setFieldValue("feature", !formik.values.feature)}
              />
              Feature
            </label>
          </div>

          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
