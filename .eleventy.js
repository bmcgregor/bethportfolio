const Image = require("@11ty/eleventy-img");
var path = require('path');

function imageShortcode(src, cls, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
  console.log(`Generating image(s) from:  ${src}`)
  let options = {
    widths: [600, 900, 1500],
    formats: ["avif", "jpeg"],
    urlPath: "/images/",
    outputDir: "./_site/images/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)
      return `${name}-${width}w.${format}`
    }
  }

  // generate images
  Image(src, options)

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }
  // get metadata
  metadata = Image.statsSync(src, options)
  return Image.generateHTML(metadata, imageAttributes)
}


module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
};