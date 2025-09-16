// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

// 使用hardhat-gas-reporter，yarn hardhat test test/TestGas 测试合约gas消耗
contract TestGas {
    uint public a;
    uint public b;
    uint public c;

    function test1() public {
        a++;
    }

    function test2() public {
        a++;
        b++;
    }

    function test3() public {
        a++;
        b++;
        c++;
    }

    function test4() public {
        c = a + b;
    }

    function test5() public {
        test4();
        b = a + c;
    }
}
