pragma solidity 0.5.0;

import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./Project.sol";

contract Artist is ERC20, ERC20Detailed {
    address payable public owner;
    uint256 public initialSupply = 100000000000;
    string public genre;
    string public bio;
    string public location;
    string public url;
    string public image;

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
    }

    modifier verifyOwner() {require (msg.sender == owner);_;}

    constructor(string memory _name, string memory _symbol, uint8 _decimals, string memory _genre, string memory _bio, string memory _location, string memory _url) 
    ERC20Detailed(_name, _symbol, _decimals)
    public {
        owner = msg.sender;
        genre = _genre;
        bio = _bio;
        location = _location;
        url = _url;
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

    function buyMerch(uint id, uint qty, uint value) public {
        require (merchandise[id].quantity >= qty);
        // require(msg.value >= merchandise[id].price * qty);//not msg.value accept erc20
        uint purchaseAmount = qty * merchandise[id].price;
        require (value * qty >= purchaseAmount); 

        this.transfer(this.owner(), value);
        //perform purchase with specific artist token 
    }

    function createProject(uint256 rate,uint256 cap, string memory _name, string memory _description) public verifyOwner() returns(address) {
        uint ownerBalance = balanceOf(this.owner());

        Project newProject = new Project(rate, msg.sender, this, cap, _name, _description );
        address projectAddress = address(newProject);

        
        emit LogProject(_name, projectAddress, owner, ownerBalance);

        // this.transferFrom(owner, projectAddress, initialSupply);
        
        return projectAddress;
    }

    function fetchArtist() public view returns (address _owner, string memory _genre, string memory _bio, string memory _location, string memory _url, uint _projectCount, uint _merchCount) {
        _owner = this.owner();
        _genre = this.genre();
        _bio = this.bio();
        _location = this.location();
        _url = this.url();
        _projectCount = this.projectCount();
        _merchCount = 42;
        // this.merchandiseCount();
        return (_owner, _genre, _bio, _location, _url, _projectCount, _merchCount);
    }


    function () external {
        revert();
    }
}