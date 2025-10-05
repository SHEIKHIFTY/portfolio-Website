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

export default function EditEducationModal({ education, onUpdated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: education?.name || "",
      session: education?.session || "",
      description: education?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      session: Yup.string().required("Session is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`/api/education?id=${education._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          onUpdated(); // refresh list
          setOpen(false);
        } else {
          console.error("Failed to update education");
        }
      } catch (err) {
        console.error("Error updating education:", err);
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
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="session">Session *</Label>
            <Input id="session" name="session" value={formik.values.session} onChange={formik.handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Input id="description" name="description" value={formik.values.description} onChange={formik.handleChange} />
          </div>
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
