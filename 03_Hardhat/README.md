# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node

# 部署到sepolia测试网
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network sepolia
# 部署后返回一个合约地址，使用改地址在sepolia区块链浏览器上查看验证该合约

# 在同一个网络（链id）下部署同一合约会有缓存（ignition/deployments/chain-xxx）
# 如果有缓存就直接读取ignition/deployments/chain-xxx/deployed_addresses.json，如需重新部署：
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network sepolia --reset
```
