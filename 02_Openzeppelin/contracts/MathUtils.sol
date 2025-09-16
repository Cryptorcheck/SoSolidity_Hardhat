// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/math/Math.sol";

contract MathUtils {
    function sum(uint a, uint b) public pure {
        Math.tryAdd(a, b);
    }

    using Math for uint256;

    function sum2(uint a, uint b) public pure {
        // Math.tryAdd(a, b);
        a.tryAdd(b);
    }
}
