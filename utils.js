const axios = require("axios");
const { spawn } = require("child_process");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const path = require("path");

const dockerComposeCwd = path.resolve(__dirname, "docker-compose");

module.exports.initBasicNetwork = async function() {
  await exec(`cd "${dockerComposeCwd}" && docker-compose up -d`);
};

module.exports.killNetwork = async function() {
  await exec(`cd "${dockerComposeCwd}" && docker-compose down`);
};

module.exports.countRegisteredWorkers = async function() {
  const { stdout } = await exec(`docker logs docker-compose_km_1 |
        grep -P 'get_active_workers|Confirmed epoch with worker params' |
        tail -1 |
        grep -Poi '0x[a-f0-9]+' |
        sort -u |
        wc -l`);
  return +stdout.trim();
};

module.exports.sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
