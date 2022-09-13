var SimpleStorage = artifacts.require("./CreateContract.sol");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorage);
};
