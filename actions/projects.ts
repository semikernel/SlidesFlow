"use server";
import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status != 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length == 0) {
      return { status: 404, error: "No Projects Found" };
    }

    return { status: 200, projects };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in onAuthenticateUser", error.message, error.stack);
    } else {
      console.log("Unknown error in onAuthenticateUser:", error);
    }
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status != 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length == 0) {
      return { status: 404, error: "No Projects Found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in onAuthenticateUser", error.message, error.stack);
    } else {
      console.log("Unknown error in onAuthenticateUser:", error);
    }
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!updatedProject) {
      return { status: 500, error: "failed to recover project" };
    }
    return { status: 200, data: updatedProject };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in onAuthenticateUser", error.message, error.stack);
    } else {
      console.log("Unknown error in onAuthenticateUser:", error);
    }
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true, // Mark the project as deleted
      },
    });

    if (!updatedProject) {
      return { status: 500, error: "Failed to delete project" };
    }
    return { status: 200, data: updatedProject };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in onAuthenticateUser", error.message, error.stack);
    } else {
      console.log("Unknown error in onAuthenticateUser:", error);
    }
    return { status: 500, error: "Internal Server Error" };
  }
};
