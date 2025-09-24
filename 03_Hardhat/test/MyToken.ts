import { expect } from "chai";
import { BaseContract } from "ethers";
import { ethers } from "hardhat";

describe("", () => {
  let contract: BaseContract;
  // MyToken合约的构造函数参数
  const initialSupply = 1000000;

  beforeEach(async () => {
    const MyToken = await ethers.getContractFactory("MyToken");

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

  it("验证合约name,symbol,decimals并测试转帐", async() => {
    console.log("\n验证合约数据");
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

    console.log("\n测试转帐");
    // 在部署合约时会mint数额为initialSupply的代币到部署合约的账户
    // 现在来验证一下
    const [acc01] = await ethers.getSigners();
    const balanceOfAcc01 = await (contract as any).balanceOf(acc01);
    expect(balanceOfAcc01).to.equal(initialSupply);

    // 检查MyToken的owner是否等于hardhat的第一个测试账户
    const owner = await (contract as any).owner();
    console.log("owner: ",owner);
    console.log("acc01: ",acc01.address);
    expect(acc01.address).to.equal(owner);
  })

  // it("测试转帐", async () => {
    
  // })
});