// .eleventy.js
module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });

  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByTag("blog");
  });

  // Date formatting
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // ✅ Reading time (200 words per minute)
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = content
      .replace(/<[^>]*>/g, "") // remove HTML
      .trim()
      .split(/\s+/).length;

    return Math.ceil(words / 200);
  });

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site"
    },
  };
};




