# Cấu trúc Dự án như sau:

```
../docs
├── .vuepress
│   ├── client.ts
│   ├── components
│   │   ├── ArticleList.vue
│   │   └── HelloWorld.vue
│   ├── config.ts
│   ├── configs
│   │   ├── head.ts
│   │   ├── index.ts
│   │   ├── meta.ts
│   │   ├── navbar.ts
│   │   └── sidebar.ts
│   └── layouts
│       ├── Article.vue
│       ├── Category.vue
│       ├── Tag.vue
│       └── Timeline.vue
├── get-started.md
├── guide
└── posts
    ├── archive1.md
    ├── archive2.md
    ├── article1.md
    ├── article10.md
    ├── article11.md
    ├── article12.md
    ├── article2.md
    ├── article3.md
    ├── article4.md
    ├── article5.md
    ├── article6.md
    ├── article7.md
    ├── article8.md
    ├── article9.md
    ├── sticky.md
    └── sticky2.md
```

# Danh sách chi tiết các file:

## File ../docs\.vuepress\client.ts:
```typescript
import { defineClientConfig } from "vuepress/client";
import Acticle from "./layouts/Article.vue";

export default defineClientConfig({
  layouts: {
    Acticle,
  },
});

```

## File ../docs\.vuepress\config.ts:
```typescript
import { blogPlugin } from "@vuepress/plugin-blog";
import { viteBundler } from "@vuepress/bundler-vite";
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

      category: [
        {
          key: "category",
          getter: (page) => page.frontmatter.category || [],
          layout: "Category",
          itemLayout: "Category",
          frontmatter: () => ({
            title: "Categories",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: "tag",
          getter: (page) => page.frontmatter.tag || [],
          layout: "Tag",
          itemLayout: "Tag",
          frontmatter: () => ({
            title: "Tags",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: "article",
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: "Article",
          frontmatter: () => ({
            title: "Articles",
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: "timeline",
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: "Timeline",
          frontmatter: () => ({
            title: "Timeline",
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
  ],
  bundler: viteBundler({
    // vite bundler options here
  }),
});

```

## File ../docs\.vuepress\components\ArticleList.vue:
```
<script setup lang="ts">
defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
});
</script>

<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>

    <article
      v-for="{ info, path } in items"
      :key="path"
      class="article"
      @click="$router.push(path)"
    >
      <header class="title">
        {{
          (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : "") +
          info.title
        }}
      </header>

      <hr />

      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>

        <span v-if="info.date && !isTimeline" class="date"
          >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >

        <span v-if="info.category" class="category"
          >Category: {{ info.category.join(", ") }}</span
        >

        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(", ") }}</span>
      </div>

      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>

<style lang="scss">
@use "@vuepress/theme-default/styles/mixins";

.article-wrapper {
  @include mixins.content_wrapper;
  text-align: center;
}

.article {
  position: relative;

  box-sizing: border-box;

  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--c-border);
  border-radius: 0.4rem;
  color: var(--c-text);

  text-align: start;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .title {
    position: relative;

    display: inline-block;

    font-size: 1.28rem;
    line-height: 2rem;

    &::after {
      content: "";

      position: absolute;
      bottom: 0;
      inset-inline-start: 0;

      width: 100%;
      height: 2px;

      background: var(--c-brand);

      visibility: hidden;

      transition: transform 0.3s ease-in-out;
      transform: scaleX(0);
    }

    &:hover {
      &::after {
        visibility: visible;
        transform: scaleX(1);
      }
    }

    a {
      color: inherit;
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;

    > span {
      margin-inline-end: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }

    h2 {
      font-size: 1.2em;
    }

    h3 {
      font-size: 1.15em;
    }
  }
}
</style>

```

## File ../docs\.vuepress\components\HelloWorld.vue:
```
<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
});
</script>

```

## File ../docs\.vuepress\configs\head.ts:
```typescript
import type { HeadConfig } from "vuepress";
export const head: HeadConfig[] = [
  // Ví dụ: thêm meta tag cho SEO
  ["meta", { name: "keywords", content: "VuePress, TypeScript, SEO, Blog" }],
];

```

## File ../docs\.vuepress\configs\index.ts:
```typescript
export * from "./head.js";
export * from "./meta.js";
export * from "./navbar.js";
export * from "./sidebar.js";

```

## File ../docs\.vuepress\configs\meta.ts:
```typescript
import type { HeadConfig } from "vuepress";
export const meta: HeadConfig[] = [
  // Ví dụ: thêm meta tag cho SEO
  ["meta", { name: "keywords", content: "VuePress, TypeScript, SEO, Blog" }],
];

```

## File ../docs\.vuepress\configs\navbar.ts:
```typescript
import { NavbarOptions } from "@vuepress/theme-default";

export const navbarOpt: NavbarOptions = [
  "/",
  {
    text: "Article",
    link: "/article/",
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
];

```

## File ../docs\.vuepress\configs\sidebar.ts:
```typescript
import type { SidebarOptions } from "@vuepress/theme-default";

export const sidebarOpt: SidebarOptions = {
  "/guide/": [
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
  ],
  "/advanced/": [
    {
      text: "Advanced",
      children: [
        "/advanced/architecture.md",
        "/advanced/plugin.md",
        "/advanced/theme.md",
      ],
    },
    {
      text: "Cookbook",
      children: [
        "/advanced/cookbook/README.md",
        "/advanced/cookbook/usage-of-client-config.md",
        "/advanced/cookbook/adding-extra-pages.md",
        "/advanced/cookbook/making-a-theme-extendable.md",
        "/advanced/cookbook/passing-data-to-client-code.md",
        "/advanced/cookbook/markdown-and-vue-sfc.md",
        "/advanced/cookbook/resolving-routes.md",
      ],
    },
  ],
  "/reference/": [
    {
      text: "Core",
      collapsible: true,
      children: [
        "/reference/cli.md",
        "/reference/config.md",
        "/reference/frontmatter.md",
        "/reference/components.md",
        "/reference/plugin-api.md",
        "/reference/theme-api.md",
        "/reference/client-api.md",
        "/reference/node-api.md",
      ],
    },
    {
      text: "Bundlers",
      children: ["/reference/bundler/vite.md", "/reference/bundler/webpack.md"],
    },
    {
      text: "Ecosystem",
      children: [
        {
          text: "Default Theme",
          link: "https://ecosystem.vuejs.press/themes/default/",
        },
        {
          text: "Plugins",
          link: "https://ecosystem.vuejs.press/plugins/",
        },
      ],
    },
  ],
};

```

## File ../docs\.vuepress\layouts\Article.vue:
```
<script lang="ts">
import { useBlogType } from "@vuepress/plugin-blog/client";
import { ParentLayout } from "@vuepress/theme-default/layouts/Layout.vue";
import { ArticleList } from "../components/ArticleList.vue";

const articles = useBlogType("article");
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="articles.items" />
      </main>
    </template>
  </ParentLayout>
</template>

```

## File ../docs\.vuepress\layouts\Category.vue:
```
<script setup lang="ts">
import { useBlogCategory } from "@vuepress/plugin-blog/client";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { RouteLink, useRoute } from "vuepress/client";
import ArticleList from "../components/ArticleList.vue";

const route = useRoute();
const categoryMap = useBlogCategory("category");
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="category-wrapper">
          <RouteLink
            v-for="({ items, path }, name) in categoryMap.map"
            :key="name"
            :to="path"
            :active="route.path === path"
            class="category"
          >
            {{ name }}
            <span class="category-num">
              {{ items.length }}
            </span>
          </RouteLink>
        </div>

        <ArticleList :items="categoryMap.currentItems ?? []" />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
@use "@vuepress/theme-default/styles/mixins";

.category-wrapper {
  @include mixins.content_wrapper;

  padding-top: 1rem !important;
  padding-bottom: 0 !important;

  font-size: 14px;

  a {
    color: inherit;
  }

  .category {
    display: inline-block;
    vertical-align: middle;

    overflow: hidden;

    margin: 0.3rem 0.6rem 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;

    cursor: pointer;

    transition: background 0.3s, color 0.3s;

    @media (max-width: 419px) {
      font-size: 0.9rem;
    }

    .category-num {
      display: inline-block;

      min-width: 1rem;
      height: 1.2rem;
      margin-inline-start: 0.2em;
      padding: 0 0.1rem;
      border-radius: 0.6rem;

      font-size: 0.7rem;
      line-height: 1.2rem;
      text-align: center;
    }

    &.route-link-active {
      background: var(--c-brand);
      color: var(--c-bg);

      .category-num {
        color: var(--c-bg);
      }
    }
  }
}
</style>

```

## File ../docs\.vuepress\layouts\Tag.vue:
```
<script setup>
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { RouteLink, useRoute } from 'vuepress/client'
import ArticleList from '../components/ArticleList.vue'

const route = useRoute()
const tagMap = useBlogCategory('tag')
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="tag-wrapper">
          <RouteLink
            v-for="({ items, path }, name) in tagMap.map"
            :key="name"
            :to="path"
            :active="route.path === path"
            class="tag"
          >
            {{ name }}
            <span class="tag-num">
              {{ items.length }}
            </span>
          </RouteLink>
        </div>

        <ArticleList :items="tagMap.currentItems ?? []" />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';

.tag-wrapper {
  @include mixins.content_wrapper;

  padding-top: 1rem !important;
  padding-bottom: 0 !important;

  font-size: 14px;

  a {
    color: inherit;
  }

  .tag {
    display: inline-block;
    vertical-align: middle;

    overflow: hidden;

    margin: 0.3rem 0.6rem 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;

    cursor: pointer;

    transition:
      background 0.3s,
      color 0.3s;

    @media (max-width: 419px) {
      font-size: 0.9rem;
    }

    .tag-num {
      display: inline-block;

      min-width: 1rem;
      height: 1.2rem;
      margin-inline-start: 0.2em;
      padding: 0 0.1rem;
      border-radius: 0.6rem;

      font-size: 0.7rem;
      line-height: 1.2rem;
      text-align: center;
    }

    &.route-link-active {
      background: var(--c-brand);
      color: var(--c-bg);

      .tag-num {
        color: var(--c-bg);
      }
    }
  }
}
</style>

```

## File ../docs\.vuepress\layouts\Timeline.vue:
```
<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import ArticleList from '../components/ArticleList.vue'

const timelines = useBlogType('timeline')
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <h1 class="timeline-title">Timeline</h1>

        <ArticleList :items="timelines.items" is-timeline />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
.timeline-title {
  padding: 0;
  text-align: center;
}
</style>

```

