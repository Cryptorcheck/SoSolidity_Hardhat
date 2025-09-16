// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Demo is ERC20 {
    constructor() ERC20("ERC20Demo", "ERCToken") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
}
