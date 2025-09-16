# 02 Openzeppelin

## 模块总览
- AccessControl 权限控制
- Tokens  代币协议
  - ERC20 - 标准化、可替代性、可分割性，继承自IERC20、IERC20Metadata、Context
    - ERC20
    - ERC20Permit 
      - 结合EIP2612，在ERC20中添加permit方法，允许用户通过EIP-712进行链下签名授权，授权交易不再需要链上approve的过程，只需要链下签名（减少一次approve调用产生的gas消耗）。签名后，用户可以直接委托第三方进行交易，自身不需要持有支付approve授权的手续费，手续费由第三方直接支付
      - 链下加签
        - 用户提供approve许可，对许可进行加签。许可包含owner地址、spender地址、value授权数量、Nonce避免重放、Deadline授权终止日
        - 由EIP712的signTypedData生成signature
      - 链上验签
        - ERC20Permit的permit方法使用 ECDSA.recover 对 signature 进行校验
    - ERC20Pausable
      - 继承ERC20和Pausable，对代币的发行和转账具备停止能力
      - _update方法上加modifier whenNotPaused
- Governance  投票、提议
- Utils 工具包（Math等）
- Proxy 可升级合约支持（透明升级合约，UUPS）
 
