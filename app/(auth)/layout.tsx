// (auth)/layout.tsx
import React from "react";
import { ThemeProvider } from "@/provider/theme-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log("Auth layout loaded"); // 确保这个log出现在浏览器控制台

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
// import React from 'react'

// type Props = {
//     children: React.ReactNode
// }

// const Layout = ({children}: Props) => {
//   return (
//     <div className='w-full min-h-screen flex justify-center items-center bg-black'>
//         {children}
//     </div>
//   )
// }

// export default Layout
