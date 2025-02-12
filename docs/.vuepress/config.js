import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from "@vuepress/plugin-search";
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

const theme = defaultTheme({
  // Logo 配置
  logo: "/images/logo.png",
  logoDark: "/images/logo-dark.png",
  // 其他配置
  editLink: false,
  repo: "https://github.com/AmosWang0626/AmosWang0626.github.io",
  // 导航栏 https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#navbar
  navbar: [
    {
      text: "首页",
      link: "/",
    },
    {
      // java/spring/mybatis/
      text: "Java技术栈",
      link: "/backend/",
    },
    {
      // linux/docker/nginx/
      text: "Ops相关",
      link: "/ops/",
    },
    {
      text: "杂货铺",
      link: "/boutique/",
    },
  ],
  // 侧边栏, 可为每个URL指定侧边栏 https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
  sidebar: {
    "/backend/": [
      {
        text: "Java基础",
        children: [
          {
            text: "String.matches() 性能测试",
            link: "/backend/java/base/1-String.matches()性能测试.md",
          },
          {
            text: "万能的HelloWorld",
            link: "/backend/java/base/2-万能的HelloWorld.md",
          },
        ],
      },
      {
        text: "Java并发编程",
        children: [
          {
            text: "Java高效并发",
            link: "/backend/java/concurrent/1-Java高效并发.md",
          },
        ],
      },
      {
        text: "设计模式",
        children: [
          {
            text: "设计模式概述",
            link: "/backend/design_mode/1-设计模式概述.md",
          },
        ],
      },
      {
        text: "MySQL",
        children: [
          {
            text: "MySQL概览",
            link: "/backend/mysql/1-MySQL概览.md",
          },
        ],
      },
    ],
    "/ops/": [
      {
        text: "Ops",
        link: "/ops/",
      },
    ],
    "/boutique/": [
      {
        text: "爱好些许",
        children: [
          {
            text: "Github之旅",
            link: "/boutique/others/Github之旅.md",
          },
        ],
      },
      {
        text: "前端技术",
        children: [
          {
            text: "编写可维护的JavaScript",
            link: "/boutique/front/01.编写可维护的JavaScript.md",
          },
          {
            text: "Hexo挂掉自动重启",
            link: "/boutique/front/02.Hexo挂掉自动重启.md",
          },
          {
            text: "VuePress + Github 自动化部署",
            link: "/boutique/front/03.VuePress结合Github自动化部署.md",
          },
        ],
      },
    ],
  },
  notFound: ["你访问的页面飞走了～", "页面飞走了～", "您访问的页面飞走了～"],
  backToHome: "回到首页",
});

export default defineUserConfig({
  bundler: viteBundler(),
  theme: theme,
  lang: "zh-CN",
  title: "JAVA技术学习笔记",
  description: "https://www.eyeo.cn/",
  head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],
  public: "./asset/public",
  dest: "./dist",
  port: 8088,
  open: true
})

export const plugins = [searchPlugin({})];
