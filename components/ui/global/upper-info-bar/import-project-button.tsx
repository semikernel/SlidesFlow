// components/ui/global/import-project-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Upload } from "lucide-react"; // 替换为 Upload 图标
import { useRouter } from "next/navigation";
import React from "react";

const ImportProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Button
      className="bg-zinc-100  dark:bg-blue-600 hover:bg-background-80 text-primary rounded-lg font-semibold"
      disabled={!user?.subscription}
    >
      <Upload className="mr-2 h-4 w-4" /> {/* 添加图标间距 */}
      导入
    </Button>
  );
};

export default ImportProjectButton;
