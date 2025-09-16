// ethers包和hardhat包都提供ethers，但ethers包在浏览器环境下使用，hardhat在node环境下使用
import { requestAccess, requestSigner } from "./utils/access";
import modifyStateAndWaitTxComplete from "./02_modify_state";
import monitorTxEvent from "./03_monitor_tx_event";


async function run() {
  if (!await requestAccess() || !await requestSigner()) {
    throw new Error("No ethereum provider")
  }

  // 01 连接钱包 pure
  // connectWalletAndHello();

  // 02 配置signer，调用合约上修改状态变量的函数；交易提交与交易完成的区别，等待交易完成展示结果
  modifyStateAndWaitTxComplete();

  // 03 通过监听合约事件，修改页面状态
  // monitorTxEvent();
}

(async function main () {
  await run();
})();