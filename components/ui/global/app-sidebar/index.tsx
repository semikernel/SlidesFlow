"use client";
import { Project, User } from "@prisma/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

// 定义一个名为AppSidebar的函数组件，接收recentProjects和user两个参数
const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
} & { user: User } & React.ComponentProps<typeof Sidebar>) => {
  // 返回一个div元素，内容为AppSidebar
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-background-90"
      {...props}
    >
      <SidebarHeader className="pt-6 px-1 pb-0" />
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:text-sidebar-accent-foreground flex items-center"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground pl-1">
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src={"/drop.png"} alt={"SlidesFlow_cclogo"} />
            <AvatarFallback className="rounded-lg">SlidesFlow</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-primary text-2xl font-light"> EvoThink</span>
      </SidebarMenuButton>
      <SidebarContent className="px-1 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
