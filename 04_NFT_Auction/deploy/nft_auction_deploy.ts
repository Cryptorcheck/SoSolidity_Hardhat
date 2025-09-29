// deployments模块来自hardhat.config中的hardhat-deploy
// upgrades模块来自hardhat.config中的@openzeppelin/hardhat-upgrades
import { deployments, ethers, upgrades } from "hardhat";
import { Address, DeploymentsExtension } from "hardhat-deploy/dist/types";

interface Arguments {
  getNamedAccounts: () => Promise<{
    [name: string]: Address;
  }>;
  deployments: DeploymentsExtension;
}

export default async ({ getNamedAccounts, deployments }: Arguments) => {
  const { save } = deployments;
  // hardhat.config中namedAccounts字段配置的测试账号别名
  const { deployer } = await getNamedAccounts();

  console.log("部署人：", deployer);

  const NftAuction = await ethers.getContractFactory("NftAuction");
  // 通过代理部署合约
  const NftAuctionProxy = await upgrades.deployProxy(
    NftAuction,
    [
      // 100 * 10000,
      // ethers.parseEther("0.000000000000000001"),
      // ethers.ZeroAddress,
      // 1,
    ],
    { initializer: "initialize" } // 合约中带有initializer修饰的初始化函数名
  );

  await NftAuctionProxy.waitForDeployment();

  const proxyAddr = await NftAuctionProxy.getAddress();
  console.log("代理合约地址：", proxyAddr);
  console.log(
    "实现合约地址：",
    await upgrades.erc1967.getImplementationAddress(proxyAddr)
  );
};

export const tags = ["deployNftAuction"];
