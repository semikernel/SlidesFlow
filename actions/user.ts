"use server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        projectsPurchased: {},
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        name: user.fullName + " " + user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl,
      },
    });

    if (newUser) {
      return { status: 201, user: newUser };
    }

    return { status: 400 };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in onAuthenticateUser", error.message, error.stack);
    } else {
      console.log("Unknown error in onAuthenticateUser:", error);
    }
    return { status: 500, error: "Internal Server Error" };
  }
};
