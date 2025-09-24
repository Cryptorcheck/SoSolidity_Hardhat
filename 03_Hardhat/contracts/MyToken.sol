// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;

    constructor(uint initialSupply) ERC20("MyToken", "MTK") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }
}
