// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ERC20PermitDemo is ERC20, ERC20Permit {
    constructor()
        ERC20("ERC20PermitDemo", "ERCPermitToken")
        ERC20Permit("ERC20PermitDemo")
    {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
}
