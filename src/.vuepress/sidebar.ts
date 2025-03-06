import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "", // 主页
    {
      text: "Java基础",
      icon: "book",
      prefix: "java/",
      children: "structure",
    },
    {
      text: "前端相关",
      icon: "book",
      prefix: "front/",
      children: "structure",
    },
    "intro",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // }
  ],
});
