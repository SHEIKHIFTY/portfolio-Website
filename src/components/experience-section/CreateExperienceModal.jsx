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

export default function CreateExperienceModal({ onCreated }) {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: { title: "", company: "", year: "", description: "", icon: "", status: true },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      company: Yup.string().required("Company is required"),
      year: Yup.string().required("Year is required"),
      description: Yup.string().required("Description is required"),
      icon: Yup.string().required("Icon is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          resetForm();
          setOpen(false);
          onCreated(); // refresh experience list
        } else {
          console.error("Create failed:", data.message);
        }
      } catch (err) {
        console.error("Error creating experience:", err);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Create Experience</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" value={formik.values.title} onChange={formik.handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company *</Label>
            <Input id="company" name="company" value={formik.values.company} onChange={formik.handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year *</Label>
            <Input id="year" name="year" value={formik.values.year} onChange={formik.handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Input id="description" name="description" value={formik.values.description} onChange={formik.handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon URL *</Label>
            <Input id="icon" name="icon" value={formik.values.icon} onChange={formik.handleChange} />
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
