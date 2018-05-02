var Util = artifacts.require("./Util.sol");
var Bingo5World = artifacts.require("./Bingo5World.sol");

module.exports = function(deployer) {
  deployer.deploy(Util);
  deployer.link(Util, Bingo5World);
  deployer.deploy(Bingo5World);
};
