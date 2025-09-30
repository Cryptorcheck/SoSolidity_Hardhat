import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // 测试网络中的账户别名，来自hardhat-deploy
  namedAccounts: {
    deployer: 0,
    user1: 1,
    user2: 2,
  }
};

export default config;
