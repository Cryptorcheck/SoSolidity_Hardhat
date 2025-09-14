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

  const contractAddr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
  
  const contract = new ethers.Contract(contractAddr, [
    "function hello() public pure returns (string memory)"
  ], provider);

  await contract.hello();
}