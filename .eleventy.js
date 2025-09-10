const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// --- Import the sitemap plugin ---
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

const isProduction = process.env.NODE_ENV === 'production';
const PATH_PREFIX = "/";

async function imageShortcode(src, alt, sizes = "100vw", classes = "") {
  let srcPath = src.startsWith('/') ? `./src${src}` : src;

  let metadata = await Image(srcPath, {
    widths: [400, 800, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/optimized/",
    urlPath: path.join(PATH_PREFIX, "/img/optimized/"),
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    class: classes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  // --- Global Data for SEO ---
  // This provides default values for the entire site.
  eleventyConfig.addGlobalData("site", {
    title: "Farman Khan | Data Analyst Portfolio",
    description: "The data analysis and storytelling portfolio of Farman Khan, showcasing projects in SQL, Python, and Power BI.",
    url: "https://datamakingsense.space",
    author: "Farman Khan"
  });

  // --- PLUGINS ---
  eleventyConfig.addPlugin(syntaxHighlight, { showCopyButton: true });

  // --- Add the sitemap plugin ---
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: "https://datamakingsense.space",
    },
  });

  // --- PASSTHROUGHS & WATCH TARGETS ---
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/img/favicons");
  // --- Add robots.txt passthrough ---
  eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

  // --- FILTERS & SHORTCODES ---
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLLL d, yyyy");
  });
  // --- Filter to create absolute URLs for SEO ---
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    return new URL(url, base).href;
  });

  // --- COLLECTIONS ---
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/projects/**/*.md").sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md").sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // --- BASE CONFIG ---
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    pathPrefix: PATH_PREFIX,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
