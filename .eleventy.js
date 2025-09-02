const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Define the path prefix in one place
const isProduction = process.env.NODE_ENV === 'production';
const PATH_PREFIX = isProduction ? "/Portfolio-Website/" : "/";

async function imageShortcode(src, alt, sizes = "100vw", classes = "") {
  let srcPath = src.startsWith('/') ? `./src${src}` : src;

  let metadata = await Image(srcPath, {
    widths: [400, 800, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/optimized/",
    // Use the path prefix to create the correct URL path
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
  // --- PLUGINS ---
  eleventyConfig.addPlugin(syntaxHighlight, {
    showCopyButton: true,
  });

  // --- PASSTHROUGHS & WATCH TARGETS ---
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/img"); 
  
  // --- FILTERS & SHORTCODES ---
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLLL d, yyyy");
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
    // Use the path prefix constant
    pathPrefix: PATH_PREFIX,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};