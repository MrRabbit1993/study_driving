const fs = require("fs");
const path = require("path");
const containersDir = path.resolve(__dirname, "../src/containers");
const targetFile = path.resolve(__dirname, "../src/containers/index.js");
const exclude = ["index.js", ".DS_Store"];
const Components = fs.readdirSync(containersDir).filter(name => {
  return !~exclude.indexOf(name);
});

let importContent = "";
let exportContent = "export {\n";
Components.forEach(item => {
  importContent += `import ${toHump(item)} from "./${item}"\n`;
  exportContent += `  ${toHump(item)},\n`;
});
exportContent = exportContent.substring(0, exportContent.length - 2) + "\n}";

fs.writeFile(targetFile, importContent + "\n" + exportContent, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("生成成功!");
});

module.exports.Components = Components;

// 下划线转换驼峰并首字母大写
function toHump(name) {
  name = name[0].toUpperCase() + name.substring(1, name.length);
  return name.replace(/-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}
