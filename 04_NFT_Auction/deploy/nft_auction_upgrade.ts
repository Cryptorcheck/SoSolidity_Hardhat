import { readFileSync } from "fs";
import { ethers, upgrades } from "hardhat";
import { Address, DeploymentsExtension } from "hardhat-deploy/dist/types";
import path from "path";

interface Arguments {
  getNamedAccounts: () => Promise<{
    [name: string]: Address;
  }>;
  deployments: DeploymentsExtension;
}

export default async ({ getNamedAccounts, deployments }: Arguments) => {
  const { save } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("部署升级用户：", deployer);

  const storePath = path.resolve(__dirname, "./.cache/proxyNftAuction.json");
  const data = readFileSync(storePath, "utf-8");

  const { proxyAddress, implAddress, abi } = JSON.parse(data);

  // 升级合约
  const NftAuctionV2 = await ethers.getContractFactory("NftAuctionV2");

  const nftAuctionProxyV2 = await upgrades.upgradeProxy(
    proxyAddress,
    NftAuctionV2
  );
  await nftAuctionProxyV2.waitForDeployment();
  const proxyAddressV2 = await nftAuctionProxyV2.getAddress();

  await save("NftAuctionProxyV2", {
    abi,
    address: proxyAddressV2,
  });
};

export const tags = ["upgradeNftAuction"];
