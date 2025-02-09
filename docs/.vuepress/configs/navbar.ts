import { NavbarOptions } from "@vuepress/theme-default";

export const navbarOpt: NavbarOptions = [
  "/",
  {
    text: "Article",
    link: "/article/",
  },
  {
    text: "Guide",
    children: [
      "/guide/introduction.md",
      "/guide/getting-started.md",
      "/guide/configuration.md",
      "/guide/page.md",
      "/guide/markdown.md",
      "/guide/assets.md",
      "/guide/i18n.md",
      "/guide/deployment.md",
      "/guide/theme.md",
      "/guide/plugin.md",
      "/guide/bundler.md",
      "/guide/migration.md",
      "/guide/troubleshooting.md",
    ],
  },
  {
    text: "Category",
    link: "/category/",
  },
  {
    text: "Tag",
    link: "/tag/",
  },
  {
    text: "Timeline",
    link: "/timeline/",
  },
] as NavbarOptions;
