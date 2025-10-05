"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProjectModal from "./EditProjectModal";
import CreateProjectModal from "./CreateProjectModal";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/project");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this project?")) return;
    try {
      const res = await fetch(`/api/project?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
      else console.error("Delete failed");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <CreateProjectModal onCreated={fetchProjects} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Technology</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Feature</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <img src={project.image}  className="w-10 h-10" />
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.technology.join(", ")}</TableCell>
                  <TableCell>{project.url}</TableCell>
                  <TableCell>{project.service}</TableCell>
                  <TableCell>{project.status ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{project.feature ? "Yes" : "No"}</TableCell>
                  <TableCell className="space-x-2">
                    <EditProjectModal project={project} onUpdated={fetchProjects} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
