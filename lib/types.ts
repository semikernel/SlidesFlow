export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem;
  slideOrder: number;
  className?: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string;
  initialRows?: number;
  initialColumns?: number;
  restrictToDrop?: boolean;
  columns?: number;
  placeholder?: string;
  className?: string;
  alt?: string;
  callOutType?: "success" | "warning" | "info" | "question" | "caution";
  link?: string;
  code?: string;
  language?: string;
  bgColor?: string;
  isTransparent?: boolean;
}

export type ContentType =
  | "column"
  | "resizable-column"
  | "text"
  | "paragraph"
  | "image"
  | "table"
  | "multiColumn"
  | "blank"
  | "imageAndText"
  | "heading1"
  | "heading2"
  | "heading3"
  | "title"
  | "heading4"
  | "blockquote"
  | "numberedList"
  | "bulletedList"
  | "code"
  | "link"
  | "quote"
  | "divider"
  | "calloutBox"
  | "todoList"
  | "bulletList"
  | "codeBlock"
  | "customButton"
  | "tableOfContents";

export interface Theme {
  name: string; // 主题名称
  fontFamily: string; // 字体族
  fontColor: string; // 字体颜色
  backgroundColor: string; // 背景颜色
  slideBackgroundColor: string; // 幻灯片背景颜色
  accentColor: string; // 强调色
  gradientBackground?: string; // 渐变背景（可选）
  sidebarColor?: string; // 侧边栏颜色（可选）
  navbarColor?: string; // 导航栏颜色（可选）
  type: "light" | "dark"; // 主题类型，支持 "light"（亮色）和 "dark"（暗色）
}
