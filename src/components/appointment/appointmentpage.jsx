"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); // track editing

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointment");
      const data = await res.json();
      setAppointments(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save appointment (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editId) {
        // update
        res = await fetch(`/api/appointment?id=${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // create
        res = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setEditId(null);
        setOpen(false);
        fetchAppointments();
      } else {
        const errData = await res.json();
        console.error("Save failed:", errData.message);
      }
    } catch (err) {
      console.error("Error saving appointment:", err);
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/appointment?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchAppointments();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Open edit modal
  const handleEdit = (appointment) => {
    setFormData({
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      subject: appointment.subject,
      message: appointment.message,
    });
    setEditId(appointment._id);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Appointments</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditId(null);
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
              }}
            >
              + New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Appointment" : "Create Appointment"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              {["name", "email", "phone", "subject", "message"].map((field) => (
                <div key={field} className="grid gap-2">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <DialogFooter>
                <Button type="submit">{editId ? "Update" : "Save"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.phone}</td>
                <td className="border p-2">{item.subject}</td>
                <td className="border p-2">{item.message}</td>
                <td className="border p-2 text-center flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
