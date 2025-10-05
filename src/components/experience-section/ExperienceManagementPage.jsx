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
import CreateExperienceModal from "@/components/experience-section/CreateExperienceModal";
import EditExperienceModal from "@/components/experience-section/EditExperienceModal";

export default function ExperienceManagementPage() {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      fetchExperiences();
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experience Management</h1>
        <CreateExperienceModal onCreated={fetchExperiences} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Experiences</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences.map((exp) => (
                <TableRow key={exp._id}>
                 
                  <TableCell>{exp.title}</TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell>{exp.year}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell className="space-x-2">
                    <EditExperienceModal experience={exp} onUpdated={fetchExperiences} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(exp._id)}>
                      Delete
                    </Button>
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
