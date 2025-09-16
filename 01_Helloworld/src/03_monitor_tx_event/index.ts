
// 本节内容：拓展上一节中使用wait等待交易完成，本节使用更优方式：监听链上交易事件
// 1、需要在合约中发送event事件
// 2、获取合约实例时，使用abi的方式定义接口

import { ethers } from "ethers";
import { getEth } from "../utils/instance";
import Counter from "../../artifacts/contracts/Counter.sol/Counter.json"

export default async function monitorTxEvent() {
  const provider = new ethers.BrowserProvider(getEth())

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDR_03, 
    // [
    //   "function counter() external",
    //   "function getCount() external view returns (uint)"
    // ], 
    Counter.abi,
    await provider.getSigner());

  const display = document.createElement("div");
  const btn = document.createElement("button");

  btn.innerHTML = "setCount";
  btn.onclick = async function() {
    await contract.counter();
  } 
  
  async function getCount(payload) {
    const { args } = payload || {};
    console.log('payload: ',payload);
    
    display.innerHTML = args[0].toString() || await contract.getCount();
  }

  // 通过CounterChange事件监听
  const eventName = contract.filters.CounterChange();
  contract.on(eventName, async (payload) => await getCount(payload));

  document.body.appendChild(display);
  document.body.appendChild(btn);

}