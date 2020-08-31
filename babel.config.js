module.exports = {
  presets: ["@vue/app"],
  plugins: [
    "dynamic-import-webpack",
    [
      "import",
      { libraryName: "vant", libraryDirectory: "es", style: true },
      "vant"
    ]
  ]
};
