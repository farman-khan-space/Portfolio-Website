const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const isProduction = process.env.NODE_ENV === 'production';
const PATH_PREFIX = "/";

async function imageShortcode(src, alt, sizes = "100vw", classes = "") {
  // Correctly resolve the path whether it's absolute or relative
  let srcPath = src.startsWith('/') ? `./src${src}` : src;

  // --- OPTIMIZATION: Added 'avif' format and defined quality settings ---
  let metadata = await Image(srcPath, {
    widths: [400, 800, 1200],
    // Add avif, the most modern and efficient format
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/optimized/",
    urlPath: path.join(PATH_PREFIX, "/img/optimized/"),
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
    // --- OPTIMIZATION: Explicitly set compression quality ---
    // This gives us more control over the final file size.
    sharpOptions: {
      jpeg: {
        quality: 80,
        progressive: true,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 75,
      }
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    class: classes,
    loading: "lazy",  // This is already a huge performance win!
    decoding: "async", // And so is this!
  };

  // The generateHTML function returns a <picture> element with all the sources
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // --- Global Data for SEO ---
  eleventyConfig.addGlobalData("site", {
    title: "Farman Khan | Data Analyst Portfolio",
    description: "The data analysis and storytelling portfolio of Farman Khan, showcasing projects in SQL, Python, and Power BI.",
    url: "https://datamakinsense.space", // Make sure this is your final domain
    author: "Farman Khan"
  });

  // --- PLUGINS ---
  eleventyConfig.addPlugin(syntaxHighlight, { showCopyButton: true });
  eleventyConfig.addPlugin(pluginRss);

  // --- PASSTHROUGHS & WATCH TARGETS ---
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/js"); 

  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/img/favicons");
  eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

  // --- FILTERS & SHORTCODES ---
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("LLLL d, yyyy");
  });
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    return new URL(url, base).href;
  });

  // --- READING TIME FILTER ---
  eleventyConfig.addFilter("readingTime", (content) => {
    const textOnly = content.replace(/(<([^>]+)>)/gi, "");
    const readingSpeed = 238; // Average reading speed in words per minute
    const wordCount = textOnly.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / readingSpeed);
    return `${minutes} min read`;
  });

  // --- COLLECTIONS ---
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/projects/**/*.md").sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
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

