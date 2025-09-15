// ethers包和hardhat包都提供ethers，但ethers包在浏览器环境下使用，hardhat在node环境下使用
import { ethers, type Eip1193Provider} from "ethers"


function getEth(): Eip1193Provider {
  const eth = window.ethereum;

  if (!eth) { 
    throw new Error("No ethereum provider")
  }

  return eth
}

async function requestAccess() {
  const eth = getEth()
  const res: string[] = await eth.request({ method: "eth_requestAccounts" });

  console.log('requestAccess:',res);
  
  return res && res.length > 0;
}

async function requestSigner() {
  const eth = getEth()
  const signers: string[] = await eth.request({ method: "eth_accounts" });

  return signers.length > 0;
}

async function getContract() {

  if (!await requestAccess() || !await requestSigner()) {
    throw new Error("No ethereum provider")
  }

  const provider = new ethers.BrowserProvider(getEth());

  console.log('process.env.CONTRACT_ADDR:', process.env.CONTRACT_ADDR);
  
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDR, 
    [
      "function counter() external",
      "function getCount() external view returns (uint)"
    ], 
    // provider, // provider，提供区块链网络连接中介
    await provider.getSigner()// signer，提供支付交易费的账号
  );

  // document.body.innerHTML = (await contract.hello()) + " init";

  const display = document.createElement("div");

  async function getCount() {
    display.innerHTML = await contract.getCount();
  }

  async function setCount() {
    const tx = await contract.counter(); // 等待交易提交
    await tx.wait(); // 等待交易完成
  }
  
  const btn = document.createElement("button");
  btn.innerHTML = "setCount"
  btn.onclick = async function() {
    await setCount();
    await getCount();
  }

  document.body.appendChild(display);
  document.body.appendChild(btn);
}

(async function main () {
  await getContract();
})();