import { defineClientConfig } from "vuepress/client";
import Article from "./layouts/Article.vue";
import Category from "./layouts/Category.vue";

import Tag from "./layouts/Tag.vue";
import Timeline from "./layouts/Timeline.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // app.component("Article", Article);
  },
  setup() {},
  layouts: {
    // Article,
  },
  rootComponents: [],
});
