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

export default function CreateEducationModal({ onCreated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", session: "", description: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      session: Yup.string().required("Session is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          resetForm();
          setOpen(false);
          onCreated(); // refresh list
        } else {
          console.error("Failed to create education");
        }
      } catch (err) {
        console.error("Error creating education:", err);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create Education</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Education</DialogTitle>
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
