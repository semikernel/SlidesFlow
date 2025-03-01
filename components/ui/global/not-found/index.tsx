import { GlobalSearchIcon } from "@/components/icons/icon";
import React from "react";

const NotFound = (props: Props) => {
  return (
    <div className="flex flex-col min-h-[60vh] w-full justify-center items-center gap-12">
      <GlobalSearchIcon className="w-20 h-20" />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-semibold text-primary">
          空空如也的项目列表
        </p>
        <p className="text-vivid text-base font-normal text-secondary pt-5">
          开始创建属于你的第一个项目吧
        </p>
        {/* <span className="text-vivid"> Generative AI</span> */}
      </div>
    </div>
  );
};

export default NotFound;
