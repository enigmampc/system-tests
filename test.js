const assert = require("assert");
const { initBasicNetwork, killNetwork, countRegisteredWorkers, sleep } = require("./utils.js");

const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const path = require("path");

const logger = require("mocha-logger");

// logger.log("This is .log()");
// logger.pending("This is .pending()");
// logger.success("This is .success()");
// logger.error("This is .error()");

const dockerComposeCwd = path.resolve(__dirname, "docker-compose");

describe("System tests", function() {
  describe("State sync", function() {
    before(async function() {
      this.timeout(5 * 60 * 1000);

      logger.log("Restarting the network...");

      await killNetwork();
      await initBasicNetwork();

      logger.log("Waiting for at least 1 worker to register with km...");

      while ((await countRegisteredWorkers()) < 1) {
        await sleep(1000);
      }
    });

    after(async function() {
      this.timeout(5 * 60 * 1000);

      logger.log("Shuting down the network...");

      await killNetwork();
    });

    it("Worker joins and successfully syncs when there is already a state", async function() {
      this.timeout(5 * 60 * 1000);

      logger.log("Deploying a secret contract to create state in the network...");
      await exec(`docker exec docker-compose_client_1 yarn test --runInBand deploy_calc`);

      logger.log("Adding another worker to the network");
      await exec(`cd "${dockerComposeCwd}" && docker-compose up -d --scale worker=2`);

      logger.log("Waitng for the new worker to sync...");
      while (true) {
        try {
          await exec(`docker logs docker-compose_worker_2 | grep -iq 'success syncing pipeline'`);
          return;
        } catch (e) {
          await sleep(1000);
        }
      }
    });
  });
});
