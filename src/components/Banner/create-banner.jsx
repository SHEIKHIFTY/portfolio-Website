"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {  useFormik } from "formik";
import { string } from "yup";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { toast } from "sonner";
export default function CreateBannerModal({refetch}) {
  const [modal, setModal] = useState(false);
  const bannerForm = useFormik({
    initialValues: {
      header: "",
      name: "",
      title: "",
      description: "",
      image: "",
      button: "",
    },
    validationSchema: Yup.object({
      header: Yup.string().required("Header is required"),
      name: Yup.string().required("Name is required"),
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image URL is required"),
      button: Yup.string().required("Button text is required"),
    }),
    onSubmit: async (values) => {
           try {
             const result = await fetch("/api/banner", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                 ...values,
               }),
             });
             bannerForm.resetForm();
             toast.success("Banner created successfully");
             setModal(false);
             refetch();
           } catch (err) {
             console.log(err);
             toast.error("Something went wrong");
           }
    },
  });
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Banner
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Banner</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new marketing banner.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={bannerForm.handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="header">Header *</Label>
            <Input
              id="header"
              name="header"
              value={bannerForm.values.header}
              onChange={bannerForm.handleChange}
              placeholder="Enter banner header"
              className={`${bannerForm.touched.header && bannerForm.errors.header ? "border-red-500" : ""} ring-0 outline-none focus-visible:ring-0`}
              
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={bannerForm.values.name}
              onChange={bannerForm.handleChange}
              placeholder="Enter banner name (slug)"
              className={bannerForm.touched.name && bannerForm.errors.name ? "border-red-500" : ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={bannerForm.values.title}
              onChange={bannerForm.handleChange}
              placeholder="Enter banner title"
              className={bannerForm.touched.title && bannerForm.errors.title ? "border-red-500" : ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={bannerForm.values.description}
              onChange={bannerForm.handleChange}
              placeholder="Enter banner description"
              rows={3}
              className={bannerForm.touched.description && bannerForm.errors.description ? "border-red-500" : ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              name="image"
              value={bannerForm.values.image}
              onChange={bannerForm.handleChange}
              placeholder="Enter image URL"
              className={bannerForm.touched.image && bannerForm.errors.image ? "border-red-500" : ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="button">Button Text</Label>
            <Input
              id="button"
              name="button"
              value={bannerForm.values.button}
              onChange={bannerForm.handleChange}
              placeholder="Enter button text (optional)"
              className={bannerForm.touched.button && bannerForm.errors.button ? "border-red-500" : ""}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
