"use client";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ThumnailPreview from "./thumnail-preview";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "../../button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/projects";

type Props = {
  projectId: string; // 项目的唯一标识符，类型为字符串
  title: string;
  createdAt: string; // 项目的创建时间，类型为字符串
  themeName: string;
  isDelete?: boolean; // 项目的删除状态，可选，类型为布尔值
  slideData: JsonValue; // 项目对应的幻灯片数据，类型为 JsonValue（表示 JSON 数据的值）
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  themeName,
  isDelete,
  slideData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };
  const theme = themes.find((theme) => theme.name === themeName) || themes[9];
  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Error", {
          description: res.error || "something went wrong",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Something went wrong. Please contact us for help!",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Error", {
          description: res.error || "Something went wrong",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Something went wrong. Please contact us for help!",
      });
    }
  };

  return (
    <motion.div
      className={`
        group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors
        ${!isDelete && "hover:bg-muted/50"}
      `}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <ThumnailPreview
          theme={theme}
          // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title} Testing
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {/*  */}
            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-gray-200 dark:hover:bg-blue-400 dark:bg-blue-500 hover:bg-gray-100"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and put it to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-gray-200 dark:hover:bg-blue-400 dark:bg-blue-500 hover:bg-gray-100"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
