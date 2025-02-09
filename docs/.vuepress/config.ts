import { viteBundler } from "@vuepress/bundler-vite";
import { blogPlugin } from "@vuepress/plugin-blog";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { head, navbarOpt, sidebarOpt } from "./configs";

export default defineUserConfig({
  base: "/",
  title: "AnPress",
  description: "VuePress Starter Project in Stackblitz",
  head: head,
  theme: defaultTheme({
    logo: "/images/hero.png",
    // navbar: navbarOpt,
    locales: {
      "/": {
        // navbar
        navbar: navbarOpt,
        // sidebar
        sidebar: sidebarOpt,
      },
    },
  }),

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith("posts/") : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || "",
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === "string"
            ? frontmatter.excerpt
            : data?.excerpt || "",
      }),
      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== "string",
      category: [],
      hotReload: true,
    }),
  ],
  bundler: viteBundler({
    // vite bundler options here
  }),
});
