"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditSkillModal({ skill, onClose, onSkillUpdated }) {
  const [form, setForm] = useState({
    category: skill.category,
    skill: skill.skill,
    name: skill.name,
    percentage: skill.percentage,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`/api/skill/${skill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onClose();
    onSkillUpdated();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-lg font-bold mb-4">Edit Skill</h2>

        <Label>Category</Label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-3"
        >
          <option value="design">Design</option>
          <option value="development">Development</option>
        </select>

        <Label>Skill</Label>
        <Input
          name="skill"
          value={form.skill}
          onChange={handleChange}
          className="mb-3"
        />

        <Label>Name</Label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mb-3"
        />

        <Label>Percentage</Label>
        <Input
          type="number"
          name="percentage"
          value={form.percentage}
          onChange={handleChange}
          className="mb-3"
        />

        <Button onClick={handleSubmit}>Update</Button>
      </DialogContent>
    </Dialog>
  );
}
