import{_ as p,c as o,d as e,a,b as s,e as t,f as l,r as c,o as r}from"./app-B4330F5T.js";const d={},u={class:"hint-container tip"};function m(v,n){const i=c("RouteLink");return r(),o("div",null,[n[8]||(n[8]=e(`<h1 id="i18n" tabindex="-1"><a class="header-anchor" href="#i18n"><span>I18n</span></a></h1><h2 id="site-i18n-config" tabindex="-1"><a class="header-anchor" href="#site-i18n-config"><span>Site I18n Config</span></a></h2><p>To take advantage of multi-language support in VuePress, you first need to use the following file and directory structure:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">docs</span>
<span class="line">├─ README.md</span>
<span class="line">├─ foo.md</span>
<span class="line">├─ nested</span>
<span class="line">│  └─ README.md</span>
<span class="line">└─ zh</span>
<span class="line">   ├─ README.md</span>
<span class="line">   ├─ foo.md</span>
<span class="line">   └─ nested</span>
<span class="line">      └─ README.md</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),a("p",null,[n[1]||(n[1]=s("Then, specify the ")),n[2]||(n[2]=a("code",null,"locales",-1)),n[3]||(n[3]=s(" option in your ")),t(i,{to:"/guide/configuration.html#config-file"},{default:l(()=>n[0]||(n[0]=[s("config file")])),_:1}),n[4]||(n[4]=s(":"))]),n[9]||(n[9]=e(`<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  locales<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// The key is the path for the locale to be nested under.</span></span>
<span class="line">    <span class="token comment">// As a special case, the default locale can use &#39;/&#39; as its path.</span></span>
<span class="line">    <span class="token string-property property">&#39;/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      lang<span class="token operator">:</span> <span class="token string">&#39;en-US&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      title<span class="token operator">:</span> <span class="token string">&#39;VuePress&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      description<span class="token operator">:</span> <span class="token string">&#39;Vue-powered Static Site Generator&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&#39;/zh/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      lang<span class="token operator">:</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      title<span class="token operator">:</span> <span class="token string">&#39;VuePress&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      description<span class="token operator">:</span> <span class="token string">&#39;Vue 驱动的静态网站生成器&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If a locale does not have a <code>lang</code>, <code>title</code>, <code>description</code> or <code>head</code>, VuePress will fallback to the root-level values. You can omit the root level config as long as they are provided in each locale.</p>`,2)),a("div",u,[n[7]||(n[7]=a("p",{class:"hint-container-title"},"Tips",-1)),a("p",null,[n[6]||(n[6]=s("Config reference: ")),t(i,{to:"/reference/config.html#locales"},{default:l(()=>n[5]||(n[5]=[s("locales")])),_:1})])]),n[10]||(n[10]=e(`<h2 id="theme-i18n-config" tabindex="-1"><a class="header-anchor" href="#theme-i18n-config"><span>Theme I18n Config</span></a></h2><p>VuePress does not restrict how themes provide multi-language support, so each theme may have different way to handle i18n, and some themes may not provide multi-language support at all. You&#39;d better refer to the theme documentation for detailed guide.</p><p>If you are using default theme, the multi-language support is the same as above:</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/theme-default&#39;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    locales<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token string-property property">&#39;/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        selectLanguageName<span class="token operator">:</span> <span class="token string">&#39;English&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token string-property property">&#39;/zh/&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        selectLanguageName<span class="token operator">:</span> <span class="token string">&#39;简体中文&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Config reference:</p><ul><li><a href="https://ecosystem.vuejs.press/themes/default/config.html" target="_blank" rel="noopener noreferrer">Default Theme &gt; Config</a></li><li><a href="https://ecosystem.vuejs.press/themes/default/locale.html" target="_blank" rel="noopener noreferrer">Default Theme &gt; Locale config</a></li></ul></div>`,5))])}const g=p(d,[["render",m],["__file","i18n.html.vue"]]),h=JSON.parse('{"path":"/guide/i18n.html","title":"I18n","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Site I18n Config","slug":"site-i18n-config","link":"#site-i18n-config","children":[]},{"level":2,"title":"Theme I18n Config","slug":"theme-i18n-config","link":"#theme-i18n-config","children":[]}],"git":{"updatedTime":1739120872000,"contributors":[{"name":"Mai Thành Duy An","username":"Mai Thành Duy An","email":"tiachop0102@gmail.com","commits":1,"url":"https://github.com/Mai Thành Duy An"}]},"filePathRelative":"guide/i18n.md","excerpt":"\\n<h2>Site I18n Config</h2>\\n<p>To take advantage of multi-language support in VuePress, you first need to use the following file and directory structure:</p>\\n<div class=\\"language-text line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"text\\" data-title=\\"text\\"><pre><code><span class=\\"line\\">docs</span>\\n<span class=\\"line\\">├─ README.md</span>\\n<span class=\\"line\\">├─ foo.md</span>\\n<span class=\\"line\\">├─ nested</span>\\n<span class=\\"line\\">│  └─ README.md</span>\\n<span class=\\"line\\">└─ zh</span>\\n<span class=\\"line\\">   ├─ README.md</span>\\n<span class=\\"line\\">   ├─ foo.md</span>\\n<span class=\\"line\\">   └─ nested</span>\\n<span class=\\"line\\">      └─ README.md</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{g as comp,h as data};
