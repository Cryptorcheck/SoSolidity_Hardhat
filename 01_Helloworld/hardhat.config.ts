import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers"
import {HardhatUserConfig} from 'hardhat/config'
/** @type import('hardhat/config').HardhatUserConfig */

const config: HardhatUserConfig  = {
  solidity: "0.8.28",
  networks: {
    hardhat: { // hardhat映射网络localhost: npx hardhat run xxx --network localhost
      chainId: 31337
    },
    // sepolia_eth: { // 其他自定义名称映射到自定义网络: npx hardhat run xxx --network sepolia_eth
    //   url: 'xxx',
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  }
};

export default config;