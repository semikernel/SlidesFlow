import { getAllProjects } from "@/actions/projects";
import NotFound from "@/components/ui/global/not-found";
import ProjectCard from "@/components/ui/global/project-card";
import Projects from "@/components/ui/global/projects";
import React from "react";

const DashboardPage = async () => {
  const allProjects = await getAllProjects();
  return (
    <div className="w-full flex flex-col gap-6 relative md:pd-0 p-4">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col item-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            项目
          </h1>
          <p className="text-base font-nomal dark:text-gray-400 text-gray-400">
            {/* 你的一站式AI自媒体动画生成平台 */}
            你的项目列表
          </p>
        </div>
      </div>
      {/* {projects} */}
      {/* <ProjectCard /> */}
      {allProjects.data && allProjects.data.length > 0 ? (
        <Projects projects={allProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
