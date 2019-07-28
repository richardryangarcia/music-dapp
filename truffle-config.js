const path = require("path");

module.exports = {
  solc: {
    // version: "0.4.25",
    optimizer: {
        enabled: true,
        runs: 1000
    }},
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};
