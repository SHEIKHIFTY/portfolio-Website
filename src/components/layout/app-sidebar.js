import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Calendar, Home, Inbox, LayoutDashboard, NotebookTabs, PencilRuler , CodeXml, GraduationCap, Handshake, FolderGit   } from "lucide-react"
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Banner",
    url: "/banner",
    icon: NotebookTabs,
  },
  {
    title: "Service-section",
    url: "/service-section",
    icon: Calendar,
  },
  {
    title: "Experience",
    url: "/experience",
    icon: PencilRuler ,
  },
  {
    title: "Skill",
    url: "/skill",
    icon: CodeXml,
  },
  {
    title: "Education",
    url: "/education",
    icon: GraduationCap  ,
  },
  {
    title: "Appointment",
    url: "/appointment",
    icon: Handshake   ,
  },
  {
    title: "Project",
    url: "/project",
    icon: FolderGit  ,
  },
]
export function AppSidebar() {
  return (
  <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}