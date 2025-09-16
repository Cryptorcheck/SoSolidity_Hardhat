import { ethers } from "ethers";
import { getEth } from "../utils/instance";

// 本节内容：
// 1、配置signer，调用合约上修改状态变量的函数
// 2、交易提交与交易完成的区别，等待交易完成展示结果
export default async function modifyStateAndWaitTxComplete () {
  const provider = new ethers.BrowserProvider(getEth());

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDR_02, 
    [
      "function counter() external",
      "function getCount() external view returns (uint)",
    ], 
    // provider, // provider，提供区块链网络连接中介
    await provider.getSigner()// signer，提供支付交易费的账号
  );

  const display = document.createElement("div");
  const btn = document.createElement("button");

  async function getCount() {
    display.innerHTML = await contract.getCount();
  }

  async function setCount() {
    const tx = await contract.counter(); // 等待交易提交
    await tx.wait(); // 等待交易完成
  }
  

  btn.innerHTML = "setCount";
  btn.onclick = async function() {
    await setCount();
    await getCount();
  } 

  document.body.appendChild(display);
  document.body.appendChild(btn);
}