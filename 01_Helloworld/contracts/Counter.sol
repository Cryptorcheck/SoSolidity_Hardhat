// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Counter {
    uint public count;

    function counter() external {
        count++;
        console.log("count: ", count);
    }

    function getCount() external view returns (uint) {
        return count;
    }
}
