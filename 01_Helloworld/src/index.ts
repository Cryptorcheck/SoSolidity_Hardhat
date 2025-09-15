// ethers包和hardhat包都提供ethers，但ethers包在浏览器环境下使用，hardhat在node环境下使用
import { ethers, type Eip1193Provider} from "ethers"
import { requestAccess, requestSigner } from "./utils/access";
import { getEth } from "./utils/instance";
import connectWalletAndHello from "./connect_metamask";
import modifyStateAndWaitTxComplete from "./modify_state";


async function run() {

  if (!await requestAccess() || !await requestSigner()) {
    throw new Error("No ethereum provider")
  }

  // 01 连接钱包 pure
  // connectWalletAndHello();

  // 02 配置signer，调用合约上修改状态变量的函数；交易提交与交易完成的区别，等待交易完成展示结果
  modifyStateAndWaitTxComplete();
}

(async function main () {
  await run();
})();