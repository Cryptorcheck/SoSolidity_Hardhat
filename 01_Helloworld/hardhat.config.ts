import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers"
import {HardhatUserConfig} from 'hardhat/config'

const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

const config: HardhatUserConfig  = {
  solidity: "0.8.28",
  networks: {
    hardhat: { // hardhat映射网络localhost: npx hardhat run xxx --network localhost
      chainId: 31337 
    },
    sepolia_eth: { // 其他自定义名称映射到自定义网络: npx hardhat run xxx --network sepolia_eth
      url: 'https://sepolia.infura.io/v3/713bf3dc57364dfabf30310b6883c46d',
      accounts: ["0x36F376040Ade6ABC0B02803b0D80F1b5bc5361a5"]
    }
  },
  gasReporter: {
    enabled: true, // yarn add -D hardhat-gas-reporter
  },
  verify: {
    etherscan: {
      apiKey: ""
    }
  }
};

export default config;