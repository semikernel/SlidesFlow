import { User } from "@prisma/client";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import SearchBar from "./upper-info-searchbar";
import ThemeSwitcher from "../mode-toggle";
import NewProjectButton from "./new-project-button";
import ImportProjectButton from "./import-project-button";

type Props = {
  user: User;
  // children: React.ReactNode;
};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between">
      <SidebarTrigger className="-ml-2" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      {/* <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
      </div>
      <ThemeSwitcher /> */}
      <div className="flex flex-1 items-center justify-start gap-4 ">
        <div className="flex-1 max-w-[70%] flex-wrap">
          <SearchBar />
        </div>
        <ThemeSwitcher />
        <ImportProjectButton user={user} />
        <NewProjectButton user={user} />
      </div>
    </header>
  );
};

export default UpperInfoBar;
