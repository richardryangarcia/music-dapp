pragma solidity 0.5.8;

import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./Project.sol";

contract Artist is ERC20, ERC20Detailed {
    address payable public owner;
    uint256 public initialSupply = 100000000000;
    string public genre;
    string public bio;
    string public location;
    string public imageHash;

    mapping (uint => address) public projects;
    uint public projectCount;

    mapping (uint => Merch) public merchandise;
    uint public merchandiseCount;

    event LogProject(string name, address newProjectAddress, address ownerAddress, uint ownerBalance);
    event LogMerchAdded(uint id, string name);

    struct Merch {
        string name;
        string description;
        uint quantity;
        uint price;
        string imageUrl;
        bool isAvailable;
        mapping (address => uint) buyers;
    }

    modifier verifyOwner() {require (msg.sender == owner);_;}

    constructor(string memory _name, string memory _symbol, uint8 _decimals, string memory _genre, string memory _bio, string memory _location, string memory _imageHash) 
    ERC20Detailed(_name, _symbol, _decimals)
    public {
        owner = msg.sender;
        genre = _genre;
        bio = _bio;
        location = _location;
        imageHash = _imageHash;
        merchandiseCount = 0;
        projectCount = 0;
        _mint(msg.sender, initialSupply);
    }    

    /** 
    
    Artist Store functions    
    
    **/
    function addMerch(string memory _name, string memory _desc, uint _quantity, uint256 _price, string memory _imageUrl) public verifyOwner() {
        Merch memory newMerch = Merch({name: _name, description: _desc, quantity: _quantity, price: _price, imageUrl: _imageUrl,isAvailable: true });
        uint newMerchId = merchandiseCount;
        merchandise[newMerchId] = newMerch;
        merchandiseCount++;
        emit LogMerchAdded(newMerchId, newMerch.name);
    }


    function makeMerchAvailable(uint id) public verifyOwner() {
        require (merchandise[id].isAvailable == false);
        merchandise[id].isAvailable = true;
    }

    function makeMerchUnavailable(uint id) public verifyOwner() {
        require (merchandise[id].isAvailable == true);
        merchandise[id].isAvailable = false;
    }

    function buyMerch(uint id, uint qty) public {
        Merch storage merch = merchandise[id];
        require (merch.quantity >= qty);
        require (merch.isAvailable == true);

        uint totalPrice = merch.price * qty;
        uint buyerTokenBalance = this.balanceOf(msg.sender);

        if (buyerTokenBalance >= totalPrice) {
            this.transfer(this.owner(), totalPrice);
            merch.quantity = merch.quantity - qty;
            merch.buyers[msg.sender] += qty;
            if (merch.quantity == 0 ){
                merch.isAvailable == false;
            }
        }
    }

    function createProject(uint256 rate,uint256 cap, string memory _name, string memory _description, string memory _imageHash) public verifyOwner() returns(address) {
        uint ownerBalance = this.balanceOf(this.owner());

        Project newProject = new Project(rate, msg.sender, this, cap, _name, _description, _imageHash );
        address projectAddress = address(newProject);

        
        emit LogProject(_name, projectAddress, owner, ownerBalance);
        
        return projectAddress;
    }

    function fetchArtist() public view returns (string memory name, address owner, string memory genre, string memory bio, string memory location, string memory imageHash, uint projectCount, uint merchCount) {
        owner = this.owner();
        genre = this.genre();
        bio = this.bio();
        location = this.location();
        imageHash = this.imageHash();
        projectCount = this.projectCount();
        merchCount = this.merchandiseCount();
        name = this.name();
        return (name, owner, genre, bio, location, imageHash, projectCount, merchCount);
    }


    function () external {
        revert();
    }
}