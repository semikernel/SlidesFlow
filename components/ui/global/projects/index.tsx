import { containerVariants } from "@/lib/constants";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import ProjectCard from "@/components/ui/global/project-card";

type Props = {
  projects: Project[]; // 定义传入的属性类型 projects，它是一个 Project 类型的数组
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" // 使用 Tailwind CSS 设置网格布局，调整不同屏幕尺寸下的列数
      variants={containerVariants} // 你可以定义动画的不同状态，这里目前是空的
      initial="hidden" // 动画初始状态是 "hidden"
      animate="visible" // 动画结束时状态是 "visible"
    >
      {/* 在这里你应该渲染 projects 数组的内容 */}
      {projects.map((project, id) => (
        <ProjectCard
          key={id}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project?.themeName}
          // src={
          //   project.thumbnail ||
          //   "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wWdf1w8fGVufDB8fHx8f3D"
          // }
        />
      ))}
    </motion.div>
  );
};

export default Projects;
