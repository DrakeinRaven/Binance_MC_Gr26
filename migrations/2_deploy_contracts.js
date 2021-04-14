const TKNExchange = artifacts.require("TKNExchange");

module.exports = function (deployer) {
  deployer.deploy(TKNExchange);
};