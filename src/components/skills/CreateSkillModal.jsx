"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SkillPage() {
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skill");
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Delete skill
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/skill?id=${id}`, { method: "DELETE" }); // ✅ fixed
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- CREATE FORM ----------
  const createFormik = useFormik({
    initialValues: { skill: "", name: "", percentage: 0, category: "" },
    validationSchema: Yup.object({
      skill: Yup.string().required("Skill is required"),
      name: Yup.string().required("Name is required"),
      percentage: Yup.number().min(0).max(100).required("Percentage is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/skill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          resetForm();
          setOpenCreate(false);
          fetchSkills();
        } else {
          console.error("Failed to create skill");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  // ---------- EDIT FORM ----------
  const editFormik = useFormik({
    initialValues: { skill: "", name: "", percentage: 0, category: "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      skill: Yup.string().required("Skill is required"),
      name: Yup.string().required("Name is required"),
      percentage: Yup.number().min(0).max(100).required("Percentage is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`/api/skill?id=${editSkill._id}`, { // ✅ fixed
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          setOpenEdit(false);
          fetchSkills();
        } else {
          console.error("Failed to update skill");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skills Management</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>+ Create Skill</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Skill</DialogTitle>
            </DialogHeader>
            <form onSubmit={createFormik.handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="skill">Skill *</Label>
                <Input id="skill" name="skill" value={createFormik.values.skill} onChange={createFormik.handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" value={createFormik.values.name} onChange={createFormik.handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="percentage">Percentage *</Label>
                <Input id="percentage" name="percentage" type="number" value={createFormik.values.percentage} onChange={createFormik.handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Input id="category" name="category" value={createFormik.values.category} onChange={createFormik.handleChange} />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill._id}>
                  <TableCell>{skill.skill}</TableCell>
                  <TableCell>{skill.name}</TableCell>
                  <TableCell>{skill.percentage}%</TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell className="space-x-2">
                    {/* Edit */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditSkill(skill);
                        editFormik.setValues({
                          skill: skill.skill,
                          name: skill.name,
                          percentage: skill.percentage,
                          category: skill.category,
                        });
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    {/* Delete */}
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(skill._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editSkill && (
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
            </DialogHeader>
            <form onSubmit={editFormik.handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="skill">Skill *</Label>
                <Input id="skill" name="skill" value={editFormik.values.skill} onChange={editFormik.handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" value={editFormik.values.name} onChange={editFormik.handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="percentage">Percentage *</Label>
                <Input id="percentage" name="percentage" type="number" value={editFormik.values.percentage} onChange={editFormik.handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
                <Input id="category" name="category" value={editFormik.values.category} onChange={editFormik.handleChange} />
              </div>
              <DialogFooter>
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
