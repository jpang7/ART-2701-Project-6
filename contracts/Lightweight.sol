// BAD BAD BAD PRACTICE. FOR PROJECT ON TESTNET
pragma solidity ^0.4.4;

import "./Safemath.sol";
import "./Erc721.sol";

contract Lightweight is ERC721{
    using SafeMath for uint256;

    struct Item {
        string name;
        string hashCode;
    }

    struct Offer {
        bool isForSale;
        uint itemId;
        address seller;
        uint value;
        address onlySellTo;
    }

    Item[] public items;

    mapping (uint => address)       public itemToOwner;
    mapping (address => uint)       public ownerItemCount;

    mapping (uint => address) private itemApprovals;
    mapping (uint => Offer) public itemsOfferedForSale;
    mapping (address => uint) public pendingWithdrawals;

    uint public highestItemId = 0;

    event NewItem(
        uint itemId,
        string name,
        string hashCode,
        address owner
    );

    event OfferPosted(uint itemId, uint salePriceInWei, address owner, bool anyone);
    event OfferTakenDown(uint itemId, address owner);
    event ItemBought(uint itemId, address buyer, address seller);

    //Get Methods
    function getOwner(uint _id) public view returns (address) {
        return itemToOwner[_id];
    }

    function getName(uint _id) public view returns (string) {
        return items[_id].name;
    }

    function getHashCode(uint _id) public view returns (string) {
        return items[_id].hashCode;
    }

    function getCount(address _owner) public view returns (uint) {
        return ownerItemCount[_owner];
    }

    function getItemsByOwner(address _owner) 
        public 
        view 
        returns(uint[])
    {
        uint[] memory result = new uint[](ownerItemCount[_owner]);
        uint counter = 0;
        for (uint i=0; i<items.length;i++) {
            if (itemToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    //Setters

    function createItem(string _name, string _hashCode, address _owner) public {
        uint id = items.push(Item(_name, _hashCode))-1;
        emit NewItem(id, _name,_hashCode,msg.sender);
        itemToOwner[id] = _owner;
        ownerItemCount[_owner]++;
    }

    function addCount(address _target) public {
        ownerItemCount[_target] = ownerItemCount[_target].add(1);
    }

    function subCount(address _target) public {
        ownerItemCount[_target] = ownerItemCount[_target].sub(1);
    }

    function changeOwnerTo (uint _id, address _newOwner) public {
        itemToOwner[_id] = _newOwner;
    }

    //Market

    function offerItem(uint _itemId, uint _salePriceInWei) public { 
        itemsOfferedForSale[_itemId] = Offer(true, _itemId, msg.sender, _salePriceInWei, 0x0);
        if (_itemId > highestItemId) highestItemId = _itemId;
        address owner = getOwner(_itemId);
        emit OfferPosted(_itemId, _salePriceInWei, owner, true);
    }

    function takeDown(uint _itemId) public {
        Offer offer = itemsOfferedForSale[_itemId];
        require(offer.isForSale);
        itemsOfferedForSale[_itemId] = Offer(false, _itemId, msg.sender, 0, 0x0);
        emit OfferTakenDown(_itemId, msg.sender);
    }

    function offerItemToAddress(uint _itemId, uint _salePriceInWei, address _to) public {
        itemsOfferedForSale[_itemId] = Offer(true, _itemId, msg.sender, _salePriceInWei, _to);
        if (_itemId > highestItemId) highestItemId = _itemId;
        address owner = getOwner(_itemId);
        emit OfferPosted(_itemId, _salePriceInWei, owner, false);
    }

    function itemToPrice(uint _itemId) public view returns (uint) {
        return itemsOfferedForSale[_itemId].value;
    }

    function buyItem(uint _itemId) public payable {
        Offer memory offer = itemsOfferedForSale[_itemId];
        require(offer.isForSale);
        require(offer.onlySellTo == 0x0 || offer.onlySellTo == msg.sender);
        require(msg.value == offer.value);
        require(offer.seller == getOwner(_itemId));

        address seller = offer.seller;

        _transfer(seller, msg.sender, _itemId);
        itemsOfferedForSale[_itemId] = Offer(false, _itemId, msg.sender, 0, 0x0);
        pendingWithdrawals[seller].add(msg.value);
        emit ItemBought(_itemId, msg.sender, seller);
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    //ERC721 override

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return getCount(_owner);
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return getOwner(_tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public {
        itemApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        addCount(_to);
        subCount(_from);
        changeOwnerTo(_tokenId, _to);
        emit Transfer(_from, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(itemApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}