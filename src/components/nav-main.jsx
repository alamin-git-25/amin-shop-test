"use client"
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useGetAllOrderQuery } from "@/redux/api/ordersApi";

export function NavMain({
  items
}) {
  const { data } = useGetAllOrderQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });
  const orders = data?.result?.filter((item) => item.status !== 'Completed' && item.status !== 'Cancelled');

  console.log(orders, "ord");



  return (
    <SidebarGroup>
      <SidebarMenu className="mt-3">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible transition-all duration-700 mt-5">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="shad py-8">
                <SidebarMenuButton tooltip={item.title}>
                  <span>{item.icon && item.icon}</span>
                  <Link href={item.url}>
                    <span className='font-poppins text-black text-2xl font-bold'>{item.title}</span>
                  </Link>

                  {/* Add indicator */}
                  {item.title === "Orders" && (
                    <span className="ml-2 text-xs font-semibold bg-red-500 text-white rounded-full px-2 py-1">
                      {orders?.length || 0}
                    </span>
                  )}

                  {/* Chevron for collapsible */}
                  {item.items && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* Render sub-menu if there are sub-items */}
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub className="sub-shad border border-gray-200">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url} className="my-2">
                            <span>{subItem.icon && subItem.icon}</span>
                            <span className='font-poppins text-black text-xl font-semibold'>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
