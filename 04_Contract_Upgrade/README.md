
# 本节内容

## 拍卖流程
- 拍卖创建 - 组织者设定拍品价格、起拍价、时间等
- 竞拍开始 - 竞拍者可以出价，价格需高于当前最高价
- 竞拍进行 - 竞拍者持续出价，系统更新最高价和领先者
- 竞拍结束 - 时间到或无人继续出价，最高出价人胜出
- 支付结算 - 赢家支付拍卖金额，平台确认支付
- 交付拍品 - 物品交付买家，交易完成

### 项目搭建
- 使用插件remixd，与remix在线ide进行代码同步
```shell
yarn add -D @remix-project/remixd

# 使用
yarn remixd
# remix在线ide插件窗口搜索remixd，点击开关打开connect
```

## 合约升级（重要‼️）
- 使用hardhat-deploy部署，不使用hardhat原生部署（对合约升级支持较差）
### 可升级合约原理
- 在区块链世界中，合约一旦部署便不可更改，这是其不可变性的特性。然而，在实际应用里，修复 bug、打补丁以及处理安全漏洞等需求无法忽视。代理模式的出现解决了这一矛盾，让合约升级成为可能，甚至成为了行业内事实上的标准

##### 代理的工作机制
###### （一）名词解释
- 代理合约：作为代理存在的合约，负责将所有调用委托给它所代理的合约，同时也是存储层，负责存储状态变量
- 实现合约：即需要进行升级或修补的合约，是代理合约所代理的对象，也被称作逻辑层。

###### （二）工作流程
- 代理合约会将实现合约的地址作为状态变量进行存储。用户不会直接向实现合约发送调用，而是通过代理合约来间接调用。代理合约使用 delegatecall 函数将调用委托给实现合约，并将实现合约返回的数据回传给调用者，若出现错误则进行回退。

```plaintext
delegatecall.     自己的上下文，逻辑合约的函数
User ----------> Proxy  -----------> Implementation
             (storage layer)          (logic layer)
```

以简单的 `Box` 合约（实现合约）和 `BoxProxy` 合约（代理合约）为例：
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Box {
  uint256 private _value;

  function store(uint256 value) public {
    _value = value;
  }

  function retrieve() public view returns (uint256) {
    return _value;
  }
}

contract BoxProxy {
  function _delegate(address implementation) internal virtual {
    // delegating logic call to boxImpl...
  }

  function getImplementationAddress() public view returns (address) {
    // Returns the address of the implementation contract
  }

  fallback() external {
    _delegate(getImplementationAddress());
  }
}
```

尽管 `Box` 合约定义了状态变量 `_value`，但实际存储该变量值的是 `BoxProxy` 合约。委托逻辑通常放在代理合约的 `fallback` 函数中。

###### （三）升级机制
合约升级的本质是通过授权改变代理合约中存储的实现合约地址变量，使其指向新部署的、升级后的实现合约。这样，代理合约就会将后续的调用委托给新的实现合约，而旧合约依然会存在于区块链上。

```plaintext
upgrade call
Admin -----------> Proxy -----> Implementation_v1
                     |
                      --------> Implementation_v2
```
##### 代理合约面临的问题及解决方案
###### （一）代理合约与实现合约的存储碰撞
文章参考：[03Solidity存储布局的冲突](./03Solidity存储布局的冲突.md)
若直接在代理合约中声明 `address implementation`，会导致与实现合约的存储发生冲突，即实现合约中的多个变量在存储槽中重叠。
// openzeppelin/initializeable

```plaintext
|Proxy                   |Implementation |
|------------------------|---------------|
|address implementation  |address var1   | <- 碰撞!
|                        |mapping var2   |
|                        |uint256 var3   |
|                        |...            |
```

解决方案是选择一个伪随机槽，将 `implementation` 的地址写入该槽。根据 [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967)，可通过以下方式计算槽位置：

```solidity
bytes32 private constant implementationPosition = bytes32(uint256(
  keccak256('eip1967.proxy.implementation ')) - 1
));
```

每次访问或修改实现合约地址时，都会对该槽进行读写操作。

###### （二）不同实现合约间的存储碰撞
由于代理合约是存储层，升级到新的实现合约时，若添加新的状态变量，必须将其附加到存储布局中，新合约应扩展而非修改存储布局，否则会发生碰撞。

**错误示例** ❌
```plaintext
|ImplementationV1 |ImplementationV2|
|-----------------|----------------|
|address foo      |address baz     | <- 碰撞!
|mapping bar      |address foo     |
|                 |mapping bar     |
|                 |...             |
```

**正确示例** ✅
```plaintext
|ImplementationV1 |ImplementationV2|
|-----------------|----------------|
|address foo      |address foo     |
|mapping bar      |mapping bar     |
|                 |address baz     | <- 扩展
|                 |...             |
```

###### （三）初始化构造函数代码问题
因为代理合约是存储层，初始化逻辑应在代理内部运行。但不能代理调用实现合约的构造函数，因为构造函数代码仅在部署时运行一次，不属于运行时字节码。

解决办法是将构造函数代码转移到实现合约的 `initializer` 函数中，该函数需确保只被调用一次。

```solidity
import "@openzeppelin/contracts - upgradeable/proxy/utils/Initializable.sol ";

contract MyContract is Initializable {
    // `initializer` modifier makes sure it runs only once
    function initialize(
        address arg1,
        uint256 arg2,
        bytes memory arg3
    ) public payable initializer {
        // "constructor "code...
    }
}
```

###### （四）代理合约与实现合约的函数冲突
代理合约也需要有自己的函数，如 `upgradeTo(address impl)` 用于决定是否修改实现合约地址。若实现合约有同名函数，就需要一种机制来决定是否将调用委托给实现合约。

[OpenZeppelin](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#transparent-proxies-and-function-clashes) 采用的方式是通过代理合约的管理员或所有者地址判断。若管理员（`msg.sender == admin`）发起调用，代理合约将自行执行该函数；否则，将调用委托给实现合约。

```plaintext
msg.sender ->| proxy `owner` 调用   | 其他人调用
----------------|------------------------------------
`owner()`       | proxy.owner()       | erc20.owner()
`upgradeTo(..)` | proxy.upgradeTo(..) | reverts
`transfer(..)`  | reverts             | erc20.transfer(..)
```

### 透明代理
### UUPS

## NFT资产跨链

## Oracle预言机获取价格
