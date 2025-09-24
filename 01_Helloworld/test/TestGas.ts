import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai"; 
import "@nomicfoundation/hardhat-ethers"
import { ethers } from "hardhat";


describe("TestGas", function () {
  it("test gas", async function () {
    // 找到合约构造方法
    const TestGas = await ethers.getContractFactory("TestGas");
    // hardhat框架会在本地启动一个区块链测试网络用于合约部署
    // 如果合约的构造函数有参数，需要在deploy方法中传入
    const instance = await TestGas.deploy();

    // 等待多个区块链节点确认后最终部署上链
    await instance.waitForDeployment();

    for (let i = 0; i < 10; i++) {
      await instance.test1();
      await instance.test2();
      await instance.test3();
      await instance.test4();
      await instance.test5();
    }

  })
});