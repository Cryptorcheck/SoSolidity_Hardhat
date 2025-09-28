// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

contract NftAuction {
    struct Auction {
        address nftAddr;
        uint nftId;
        address seller;
        uint duration;
        uint startPrice;
        bool isStarted;
        bool isEnded;
        uint32 expiredAt;
        address highestBidder; // 最高出价人
        uint highestBid;
    }

    address public admin;

    mapping(uint id => Auction) public auctions;
    uint public nextAuctionId;

    constructor() {
        admin = msg.sender;
    }

    event StartAuction(uint indexed id);
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed sender, uint amount);
    event End(address indexed _highestBidder, uint _highestBid);

    modifier onlyAdmin() {
        require(msg.sender == admin, "no authorized");
        _;
    }

    modifier onlyAuctionOwner(uint id) {
        require(msg.sender == auctions[id].seller, "no authorized");
        _;
    }

    modifier isAuctionStarted(uint id) {
        require(auctions[id].isStarted, "no start yet");
        _;
    }

    modifier isAuctionEnded(uint id) {
        require(!auctions[id].isEnded, "auction has expired");
        _;
    }

    // 创建拍卖
    function createAuction(
        uint _dur,
        uint _startPrice,
        uint _tokenId,
        address _nftAddr
    ) external onlyAdmin {
        require(_dur > 60 seconds, "duration must be greater than 1 min");
        require(_startPrice >= 0, "start price must be greater than 0");
        auctions[nextAuctionId] = Auction({
            nftAddr: _nftAddr,
            nftId: _tokenId,
            seller: msg.sender,
            duration: _dur,
            startPrice: _startPrice,
            isStarted: false,
            isEnded: false,
            expiredAt: 0,
            highestBid: 0,
            highestBidder: address(0)
        });
        nextAuctionId++;
    }

    // 开始拍卖
    function start(uint auctionId) external onlyAuctionOwner(auctionId) {
        require(!auctions[auctionId].isStarted, "auction has started");
        Auction storage auction = auctions[auctionId];
        auction.isStarted = true;
        auction.expiredAt = uint32(block.timestamp + auction.duration);

        // TODO: transferFrom

        emit StartAuction(auctionId);
    }

    // 买家竞价
    function bid(
        uint auctionId
    ) external payable isAuctionStarted(auctionId) isAuctionEnded(auctionId) {
        Auction storage auction = auctions[auctionId];
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }
}
