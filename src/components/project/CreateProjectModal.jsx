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

export default function CreateProjectModal({ onCreated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      technology: "",
      url: "",
      service: "",
      status: true,
      feature: false,
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image URL is required"),
      name: Yup.string().required("Project Name is required"),
      technology: Yup.string().required("Technology is required"),
      url: Yup.string().required("URL is required"),
      service: Yup.string().required("Service is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Convert technology to array
        const body = {
          ...values,
          technology: values.technology.split(",").map((t) => t.trim()),
        };

        const res = await fetch("/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json(); // ✅ get response JSON safely

        if (res.ok) {
          resetForm();
          setOpen(false);
          onCreated(); // refresh project list
        } else {
          console.error("Create failed:", data.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error creating project:", err);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
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
                checked={formik.values.status}
                onChange={() => formik.setFieldValue("status", !formik.values.status)}
              />
              Active
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formik.values.feature}
                onChange={() => formik.setFieldValue("feature", !formik.values.feature)}
              />
              Feature
            </label>
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
