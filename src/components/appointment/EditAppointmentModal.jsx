"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditAppointmentModal({ appointment, onUpdated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: appointment?.name || "",
      email: appointment?.email || "",
      phone: appointment?.phone || "",
      subject: appointment?.subject || "",
      message: appointment?.message || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`/api/appointment?id=${appointment._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (res.ok) {
          onUpdated();
          setOpen(false);
        } else {
          console.error("Update failed:", data.message);
        }
      } catch (err) {
        console.error("Error updating appointment:", err);
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
          <DialogTitle>Edit Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" value={formik.values.subject} onChange={formik.handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Input id="message" name="message" value={formik.values.message} onChange={formik.handleChange} />
          </div>

          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
