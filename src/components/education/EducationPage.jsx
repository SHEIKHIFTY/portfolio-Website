"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateEducationModal from "./CreateEducationModal";
import EditEducationModal from "./EditEducationModal";

export default function EducationPage() {
  const [educations, setEducations] = useState([]);

  const fetchEducations = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/education?id=${id}`, { method: "DELETE" });
      fetchEducations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education Management</h2>
        <CreateEducationModal onCreated={fetchEducations} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Education</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educations.map((edu) => (
                <TableRow key={edu._id}>
                  <TableCell>{edu.name}</TableCell>
                  <TableCell>{edu.session}</TableCell>
                  <TableCell>{edu.description}</TableCell>
                  <TableCell className="space-x-2">
                    <EditEducationModal education={edu} onUpdated={fetchEducations} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(edu._id)}>
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
