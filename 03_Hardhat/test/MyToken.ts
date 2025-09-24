import { expect } from "chai";
import { BaseContract } from "ethers";
import { ethers } from "hardhat";

describe("", () => {
  let contract: BaseContract;

  beforeEach(async () => {
    const MyToken = await ethers.getContractFactory("MyToken");

    // MyToken合约的构造函数参数
    const initialSupply = 1000000;

    
    // 使用deploy方法，不指定部署账号直接部署合约
    // 默认会使用hardhat中的测试account1
    // 可通过 await ethers.getSigners() 获取hardhat中的测试账号列表
    // 那么，在MyToken合约构造函数中的msg.sender即为hardhat中的测试account1
    // 根据MyToken合约的构造函数可得知，此时MyToken合约中测试account1的balance应该为initialSupply
    contract = await MyToken.deploy(initialSupply);
    await contract.waitForDeployment();

    const addr = await contract.getAddress();

    console.log("addr: ",addr);

    expect(addr).to.length.greaterThan(0);
  });

  it("验证合约name,symbol,decimals", async() => {
    // name、symbol、decimals都是ERC20的内置方法
    const name = await (contract as any).name();
    console.log("name: ", name);
    const symbol = await (contract as any).symbol();
    console.log("symbol: ", symbol);
    const decimals = await (contract as any).decimals();
    console.log("decimals: ", decimals);

    expect(name).to.equal("MyToken");
    expect(symbol).to.equal("MTK");
    expect(decimals).to.equal(18);
  })

  it("测试转帐", () => {
    console.log("测试转帐");
  })
});