"use client"

import * as React from "react"

import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Dashboard } from "@mui/icons-material"

// This is sample data.
const data = {


  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Dashboard className="w-6 h-6" />,
    },
    {
      title: "Products",
      url: "#",
      icon: <Dashboard className="w-6 h-6" />,
      items: [
        {
          title: "All Products",
          url: "/dashboard/product",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },
        {
          title: "Add Product",
          url: "/dashboard/product/add-product",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },

      ],
    },
    {
      title: "Category",
      url: "#",
      icon: <Dashboard className="w-6 h-6" />,
      items: [
        {
          title: "All Categories",
          url: "/dashboard/category/all-category",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },
        {
          title: "Add Category",
          url: "/dashboard/category/add-category",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },

      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <Dashboard className="w-6 h-6" />,
      status: '12'
    },
    {
      title: "Banners",
      url: "#",
      icon: <Dashboard className="w-6 h-6" />,
      items: [
        {
          title: "All Banners",
          url: "/dashboard/banner/all-banner",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },
        {
          title: "Add Banners",
          url: "/dashboard/banner/add-banner",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },

      ],
    },
    {
      title: "Ads",
      url: "#",
      icon: <Dashboard className="w-6 h-6" />,
      items: [
        {
          title: "All Ads",
          url: "#",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },
        {
          title: "Add Ads",
          url: "#",
          icon: <AdjustRoundedIcon className="w-4 h-4" />,
        },

      ],
    },
  ],

}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
