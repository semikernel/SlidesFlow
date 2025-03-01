"use client";
import { Project } from "@prisma/client";
import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react";
import { JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();
  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      // toast("Event has been deleted");
      toast.error("Project Not Found", {
        description: "Please Try Again",
        // style: { backgroundColor: "grey", color: "black" },
      });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };
  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0
          ? recentProjects.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="`hover:bg-primary-80`"
                >
                  <Button
                    variant={"link"}
                    onClick={() => {
                      handleClick(item.id, item.slides);
                    }}
                    className={`text-xs items-center justify-start`}
                  >
                    <span>{item.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : ""}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    // <Button
    //   variant={"link"}
    //   onClick={() => handleClick("ADFasdfasdf", "[]")}
    //   className={"text-xs items-center justify-start"}
    // >
    //   asdasd
    // </Button>
    <> </>
  );
};
export default RecentOpen;
