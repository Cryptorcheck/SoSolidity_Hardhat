import { ethers } from "ethers";
import { getEth } from "../utils/instance";


// 本节内容：连接钱包，并执行helloworld合约的pure方法hello

export default async function connectWalletAndHello() {
    const provider = new ethers.BrowserProvider(getEth());
  
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDR, 
      [
        "function counter() external",
        "function getCount() external view returns (uint)"
      ], 
      provider, // provider，提供区块链网络连接中介
    );
    
  document.body.innerHTML = (await contract.hello()) + " init";
}