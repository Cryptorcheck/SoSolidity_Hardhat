import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    // sepolia测试网
    eth_sepolia: {
      // 在https://developer.metamask.io的infura rpc获取
      url: "https://sepolia.infura.io/v3/713bf3dc57364dfabf30310b6883c46d",
      // 钱包私钥
      accounts: ["f6a7bf23cebfa4847fc7a38e3e1c3bbdbb87fea064125368febafd579480bc75"]
    },
    // 以太坊主网
    eth_mainnet: {
      url: "https://mainnet.infura.io/v3/713bf3dc57364dfabf30310b6883c46d",
      accounts: ["f6a7bf23cebfa4847fc7a38e3e1c3bbdbb87fea064125368febafd579480bc75"]
    }
  }
};


export default config;
