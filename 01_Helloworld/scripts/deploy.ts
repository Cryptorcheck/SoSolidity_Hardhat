import "@nomicfoundation/hardhat-chai-matchers"
import { ethers } from "hardhat";


async function deploy() {
  // 找到合约构造方法
  const Helloworld = await ethers.getContractFactory("Helloworld");
  // hardhat框架会在本地启动一个区块链测试网络用于合约部署
  const instance = await Helloworld.deploy();

  // 等待多个区块链节点确认后最终部署上链
  await instance.waitForDeployment();

  return instance;
};

async function sayHello(hello:any) {
  console.log("sayHello:", await hello.hello());
}

deploy().then(sayHello)