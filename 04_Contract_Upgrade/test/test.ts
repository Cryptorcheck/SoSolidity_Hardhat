import { ethers } from "hardhat";

describe("NftAuction", () => {
  let instance;
  it("NftAuction deploy", async () => {
    const contract =  await ethers.getContractFactory("NftAuction");
    instance = await contract.deploy();
    await instance.waitForDeployment();

    await instance.createAuction(
      100 * 10000,
      ethers.parseEther("0.000000000000000001"),
      ethers.ZeroAddress,
      1
    );

    const auction = await instance.auctions(0);
    console.log("auction: ", auction);
  });
});