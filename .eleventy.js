// .eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("CNAME");
  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site"   // 👈 cleaner than "docs"
    },
  };
};
