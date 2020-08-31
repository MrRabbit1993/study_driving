const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const rawArgv = process.argv.slice(2);
const args = require("minimist")(rawArgv);
// const command = args._[0]
const context = process.env.VUE_CLI_CONTEXT || process.cwd();
const env = args.env || args.mode || "development";
const envFile = path.resolve(context, `env/${env}`);
console.log("env:::", env);
const load = (path, debug) => {
  try {
    const env = dotenv.config({
      path,
      debug: debug !== undefined ? debug : process.env.DEBUG
    });
    return dotenvExpand(env);
  } catch (err) {
    // only ignore error if file is not found
    if (err.toString().indexOf("ENOENT") < 0) {
      console.log(err);
    }
  }
};
if (fs.existsSync(envFile)) {
  load(envFile);
}

if (args.hasOwnProperty("config_path")) {
  const configPath = args.config_path;
  process.env.VUE_CLI_SERVICE_CONFIG_PATH =
    configPath.charAt(0) === "/"
      ? configPath
      : path.resolve(context, configPath);
}

module.exports = (api, _projectOptions) => {
  console.log("loadenv::::", api.id);
};

module.exports.args = args;
module.exports.load = load;
