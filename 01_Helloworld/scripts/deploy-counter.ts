import "@nomicfoundation/hardhat-ethers"
import {ethers} from "hardhat";


async function deploy() {
  const Counter = await ethers.getContractFactory("Counter");
  const instance = await Counter.deploy();

  await instance.waitForDeployment();

  return instance;
}

async function handleCounter(contract) {
  await contract.counter()
  console.log("handleGetCounter: ", await contract.getCount());
}

deploy().then(handleCounter)