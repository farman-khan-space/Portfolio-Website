// .eleventy.js

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // THE FIX: Removed the incorrect passthrough for style.css
  eleventyConfig.addPassthroughCopy("./src/img"); 

  // Create a collection for projects, sorted by date (newest first)
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/projects/**/*.md").sort(function(a, b) {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Create a collection for blog posts, sorted by date (newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md").sort(function(a, b) {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    pathPrefix: "/Portfolio-Website/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

