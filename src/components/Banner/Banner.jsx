"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import CreateBannerModal from '@/components/Banner/create-banner';
import EditBannerModal from "./edit-modal";

export default function BannerManagementPage() {
  const [banners, setBanners] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);



  const resetForm = () => {
    setFormData({
      header: "",
      name: "",
      title: "",
      description: "",
      image: "",
      button: "",
    });
  };


  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      header: banner.header,
      name: banner.name,
      title: banner.title,
      description: banner.description,
      image: banner.image,
      button: banner.button || "",
    });
    setIsEditModalOpen(true);
  };



  const handleDelete = (id) => {
    try{
      fetch(`/api/banner?id=${id}`, {
        method: "DELETE",
      });
      toast.success("Banner deleted successfully");
      fetchBanner();
    }catch(err){
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    // const { id, value } = e.target;
    // setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const fetchBanner = async () => {
    const res = await fetch("/api/banner");
    const data = await res.json();
    setBanners(data);
  };
  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              Banner Management
            </h1>
            <p className="text-muted-foreground text-pretty">
              Manage your marketing banners with ease. Create, edit, and
              organize your promotional content.
            </p>
          </div>
      <CreateBannerModal refetch={fetchBanner}  />
          
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Banners
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{banners.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Banners
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-accent text-accent-foreground"
              >
                Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{banners.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {banners.filter((b) => new Date().getTime() - b.updatedAt.getTime() < 7 * 24 * 60 * 60 * 1000).length} */}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Banners</CardTitle>
            <CardDescription>
              A comprehensive list of all your marketing banners with quick
              actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Header</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Button</TableHead>
                  {/* <TableHead>Updated</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner) => (
                  <TableRow key={banner.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="w-16 h-10 bg-muted rounded overflow-hidden">
                        <img
                          src={banner.image || "/placeholder.svg"}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {banner.header}
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {banner.name}
                      </code>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {banner.title}
                    </TableCell>
                    <TableCell>
                      {banner.button ? (
                        <Badge variant="outline">{banner.button}</Badge>
                      ) : (
                        <span className="text-muted-foreground">No button</span>
                      )}
                    </TableCell>
                    {/* <TableCell className="text-muted-foreground">{banner?.updatedAt?.toLocaleDateString()}</TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <EditBannerModal data={banner} refetch={fetchBanner} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Banner</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{banner.header}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(banner._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* Create modal */}
    </div>
  );
}
