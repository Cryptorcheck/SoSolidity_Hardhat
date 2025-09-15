# SoSolidty智能合约学习

## 第一个Hardhat合约

```bash
# 安装
yarn add -D hardhat
yarn hardhat --init
```

### 目录结构
- [contracts 合约](contracts)
  - [Helloworld.sol](contracts/Helloworld.sol)
- [ignition 部署脚本](ignition)
- [scripts 部署脚本](scripts)
- [test 单元测试](test)
- [hardhat 配置文件](hardhat.config.js)

### 部署

#### 本地配置区块链网络
```bash
yarn hardhat node
# 执行该命令会生成一个rpc地址和20个测试账号
# 启动网络后，可以尝试部署合约到该测试网络中
```

#### 部署到本地区块链网络
```bash
# 部署合约时，默认会默认使用测试网络中的第一个账号作为合约部署人
yarn hardhat run ./scripts/xxx.ts --network localhost

# 执行部署后，区块链网络返回信息：
# 合约部署信息：
eth_accounts
hardhat_metadata (20)
eth_blockNumber
eth_getBlockByNumber
eth_feeHistory
eth_maxPriorityFeePerGas
eth_sendTransaction
  Contract deployment: Helloworld
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3 # 合约地址
  Transaction:         0xb37ab16d1c4b3522e639a8817a9bfa101a4f59f0f19773a807e01b4a9a7015a4
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 # 合约部署人（默认测试网络中的第一个账号）
  Value:               0 ETH
  Gas used:            133133 of 30000000 # 消耗gas
  Block #1:            0x06cd2f410acb9045a97d95fcccfc5a473a6c42dd7ff05949645e5554556f3ac9
# 合约call方法：hello为pure函数，不修改合约状态变量，不生成新的区块，无gas等消耗信息
eth_getTransactionByHash
eth_getTransactionReceipt
eth_call
  Contract call:       Helloworld#hello
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 # 调用者
  To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3 # 合约地址
```


#### 连接Metamask
- 在Metamask中创建自定义网络并关联到本地网络
  - 需要输入启动网络时返回的rpc地址
- 在Metamask中添加该网络的测试账号
  - 将启动网络时返回的测试账号通过私钥导入钱包

### 回顾调用过程
- hardhat编译合约生成json中的abi接口和bytecode
- deploy脚本通过hardhat访问json中的bytecode，将之部署在区块链网络中
- metamask连接到区块链网络
- ethers通过metamask调用在区块链网络上的合约 
- 合约在区块链网络上执行后返回结果到metamask
- metamask返回结果给浏览器