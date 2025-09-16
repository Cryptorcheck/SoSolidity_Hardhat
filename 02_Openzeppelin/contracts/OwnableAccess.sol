// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnableAccess is Ownable {
    uint public a;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function func() public view onlyOwner returns (uint b) {
        b = a;
    }
}
