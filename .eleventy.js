// .eleventy.js
const isProduction = process.env.NODE_ENV === 'production';

module.exports = function(eleventyConfig) {
  // This line is new! It copies the compiled CSS to the output folder.
  eleventyConfig.addPassthroughCopy("./src/css/style.css");

  // Watch for changes in your CSS folder for live-reloading
  eleventyConfig.addWatchTarget("./src/css/");

  // Copy assets like images
  eleventyConfig.addPassthroughCopy("./src/img"); 
  
  // ... the rest of your config remains the same
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/projects/**/*.md").sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md").sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    // Conditionally sets the pathPrefix
    pathPrefix: isProduction ? "/Portfolio-Website/" : "/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};