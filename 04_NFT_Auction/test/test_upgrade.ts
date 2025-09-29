import { expect } from "chai";
import { deployments, ethers, upgrades } from "hardhat";

describe("Test Upgrade Contract", async () => {
  it("Should be able to deploy", async () => {
    // tag为部署和升级脚本导出的tags
    const deployTags = ["deployNftAuction"];
    const upgradeTags = ["upgradeNftAuction"];

    // 1、部署合约
    await deployments.fixture(deployTags);

    const nftAuctionProxy = await deployments.get("NftAuctionProxy");

    // 2、创建拍卖
    const nftAuction = await ethers.getContractAt(
      "NftAuction",
      nftAuctionProxy.address
    );

    await nftAuction.createAuction(
      100 * 1000,
      ethers.parseEther("0.01"),
      ethers.ZeroAddress,
      1
    );

    const auction = await nftAuction.auctions(0);
    console.log("拍卖创建成功: ", auction);

    const implAddress = await upgrades.erc1967.getImplementationAddress(
      nftAuctionProxy.address
    );

    // 3、升级合约
    await deployments.fixture(upgradeTags);

    const implAddressUpgrade = await upgrades.erc1967.getImplementationAddress(
      nftAuctionProxy.address
    );

    // 4、读取升级后合约的auction[0]，检查状态变量是否与升级前的相同
    expect((await nftAuction.auctions(0)).startPrice).to.equal(
      auction.startPrice
    );

    expect(implAddressUpgrade).to.equal(implAddress);
  });
});
