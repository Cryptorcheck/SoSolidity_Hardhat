// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

contract NftAuction {
    struct Auction {
        address seller;
        uint duration;
        uint startPrice;
        bool isEnded;
        address highestBidder;
        uint highestBid;
    }

    address public admin;

    mapping(uint id => Auction) public auctions;
    uint public nextAuctionId;

    constructor() {
        admin = msg.sender;
    }

    // 创建拍卖
    function createAuction() external {}
}
