// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

contract NftAuction {
    struct Auction {
        address seller;
        uint duration;
        uint startPrice;
        bool isEnded;
        address highestBidder; // 最高出价人
        uint highestBid;
    }

    address public admin;

    mapping(uint id => Auction) public auctions;
    uint public nextAuctionId;

    constructor() {
        admin = msg.sender;
    }

    event StartAuction();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed sender, uint amount);
    event End(address indexed _highestBidder, uint _highestBid);

    modifier onlyAdmin() {
        require(msg.sender == admin, "no authorized");
        _;
    }

    // 创建拍卖
    function createAuction(uint _dur, uint _startPrice) external onlyAdmin {
        require(_dur > 60 seconds, "duration must be greater than 1 min");
        require(_startPrice >= 0, "start price must be greater than 0");
        auctions[nextAuctionId] = Auction({
            seller: msg.sender,
            duration: _dur,
            startPrice: _startPrice,
            isEnded: false,
            highestBid: 0,
            highestBidder: address(0)
        });
        nextAuctionId++;
    }
}
