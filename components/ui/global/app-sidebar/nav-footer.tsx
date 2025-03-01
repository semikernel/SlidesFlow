"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs"; // 从 Clerk 获取用户信息
import { User } from "@prisma/client"; // 从 Prisma 获取 User 类型
import { useRouter } from "next/navigation"; // 用于管理路由
import React, { useState } from "react"; // 引入 React 和 useState
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  // NavFooter 组件，接收 prismaUser 属性
  const { isLoaded, isSignedIn, user } = useUser(); // 使用 useUser 钩子获取用户信息
  const [loading, setLoading] = useState(false); // 状态：loading 用于控制加载状态
  const router = useRouter(); // 使用 useRouter 钩子管理页面导航

  // 如果用户数据没有加载完，或者用户未登录，则不渲染任何内容
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // 如果已加载并且用户已登录，则渲染 NavFooter
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden ">
          {/* {!prismaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background-80 rounded-xl bg-gray-100">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">Creative AI</span>
                </p>{" "}
                <span className="text-sm dark:text-secondary">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border-vivid text-primary rounded-full font-bold bg-gray-50 hover:bg-gray-50"
                  variant="default"
                  size="lg"
                >
                  {loading ? "Updating..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )} */}
          <SignedIn>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-gray-400">
                  {/* {user?.emailAddresses[0]?.emailAddress} */}
                  {user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter; // 导出 NavFooter 组件
