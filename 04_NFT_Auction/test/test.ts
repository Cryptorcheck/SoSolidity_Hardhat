import { ethers } from "hardhat";


describe("NftAuction", () => {
  let contract;
  beforeEach(async () => {
    const instance =  await ethers.getContractFactory("NftAuction");
    contract = await instance.deploy();
    await contract.waitForDeployment();
  });
});