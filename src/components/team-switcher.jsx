"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function TeamSwitcher({
  teams
}) {
  const { isMobile } = useSidebar()
  // const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    (<SidebarMenu>
      <Link href='/'>Al Ahsan</Link>
    </SidebarMenu>)
  );
}
