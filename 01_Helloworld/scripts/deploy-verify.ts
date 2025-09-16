import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers"

async function deploy() {
  // 找到合约构造方法
  const ContractVerify = await ethers.getContractFactory("ContractVerify");
  // hardhat框架会在本地启动一个区块链测试网络用于合约部署
  const instance = await ContractVerify.deploy();

  // 等待多个区块链节点确认后最终部署上链
  await instance.waitForDeployment();

  return instance;
};

async function verify(contract:any) {
  console.log("verify:", await contract.verify());
}

deploy().then(verify)