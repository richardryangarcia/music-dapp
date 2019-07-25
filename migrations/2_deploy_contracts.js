var ArtistFactory = artifacts.require("./ArtistFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(ArtistFactory)
};
