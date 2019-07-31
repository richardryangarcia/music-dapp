pragma solidity 0.5.8;

import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "./Project.sol";


/** @title Artist  */
contract Artist is ERC20Detailed, ERC20Mintable, ERC20Pausable {
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

    /** @dev Artist constructor
      * @param _name name of artist.
      * @param _symbol symbol of artist Token.
      * @param _decimals number of decimals used to get its user representatio for Artist Token.
      * @param _genre genre of artist.
      * @param _bio bio of artist.
      * @param _location location of artist.
      * @param _imageHash ipfsHash of artist image.
     **/
    constructor(string memory _name, string memory _symbol, uint8 _decimals, string memory _genre, string memory _bio, string memory _location, string memory _imageHash) 
    ERC20Detailed(_name, _symbol, _decimals)
    public {
        owner = tx.origin;
        genre = _genre;
        bio = _bio;
        location = _location;
        imageHash = _imageHash;
        merchandiseCount = 0;
        projectCount = 0;
    }    

    /** @dev get artist details
      * @return name of Artist
      * @return owner address of Artist
      * @return genre of Artist
      * @return bio of Artist
      * @return location of Artist
      * @return imageHash of Artist image
      * @return projectCount of Artist
      * @return merchCount of Artist
     **/
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

    /** @dev Creates a new merchandise and adds its to artist's merch store
      * @param _name name of merchandise.
      * @param _desc description of merchandise.
      * @param _quantity total initial quantity of merchandise.
      * @param _price price of merchandise in wei.
      * @param _imageUrl ipfsHash of merchandise image.
     **/
    function addMerch(string memory _name, string memory _desc, uint _quantity, uint256 _price, string memory _imageUrl) public  {
        Merch memory newMerch = Merch({name: _name, description: _desc, quantity: _quantity, price: _price, imageUrl: _imageUrl,isAvailable: true });
        uint newMerchId = merchandiseCount;
        merchandise[newMerchId] = newMerch;
        merchandiseCount++;
        emit LogMerchAdded(newMerchId, newMerch.name);
    }

    /** @dev makes merchandise status 'available'
      * @param id id of merchandise to be updated.
     **/
    function makeMerchAvailable(uint id) public verifyOwner() {
        require (merchandise[id].isAvailable == false);
        merchandise[id].isAvailable = true;
    }

    /** @dev makes merchandise status 'unavailable'
      * @param id id of merchandise to be updated.
     **/
    function makeMerchUnavailable(uint id) public verifyOwner() {
        require (merchandise[id].isAvailable == true);
        merchandise[id].isAvailable = false;
    }

    /** @dev purchase merch item from store with artist ERC20 tokens.
      * @param id id of merchandise to be purchased.
      * @param qty quantity to be purchased.
      * @param total total cost of purchase in wei.
      * @return true on completion.
     **/
    function buyMerch(uint id, uint qty, uint256 total) public {
        Merch storage merch = merchandise[id];
        require (merch.quantity >= qty);
        require (merch.isAvailable == true);

        uint buyerTokenBalance = this.balanceOf(msg.sender);

        if (buyerTokenBalance >= total) {
            this.transfer(this.owner(), total);
            merch.quantity = merch.quantity - qty;
            merch.buyers[msg.sender] += qty;
            if (merch.quantity == 0 ){
                merch.isAvailable = false;
            }
        }
    }

    /** @dev override transfer function to allow tx.origin to transfer (spend) Artist ERC20 tokens
      * @param recipient id of merchandise to be updated.
      * @param amount id of merchandise to be updated.
      * @return true on completion.
     **/
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(tx.origin, recipient, amount);
        return true;
    }

    /** @dev returns merch details 
      * @param merchId of merch to be retrieved
      * @return name of Merchandise
      * @return description of Merchandise
      * @return quantity of Merchandise
      * @return price of Merchandise
      * @return imageUrl of Merchandise
      * @return isAvailable of Merchandise
     **/
    function getMerch(uint merchId) public view returns (string memory name, string memory description, uint quantity, uint price, string memory imageUrl, bool isAvailable) {
        Merch memory merch =  merchandise[merchId];
        name =  merch.name;
        description = merch.description;
        quantity = merch.quantity;
        price = merch.price;
        imageUrl = merch.imageUrl;
        isAvailable = merch.isAvailable;
        return (name, description, quantity, price, imageUrl, isAvailable);
    }

    /** @dev create project to be crowdfunded 
      * @param _rate id of merchandise to be purchased.
      * @param _cap id of merchandise to be purchased.
      * @param _name id of merchandise to be purchased.
      * @param _description id of merchandise to be purchased.
      * @param _imageHash id of merchandise to be purchased.
      * @return address of newly created project.
     **/
    function createProject(uint256 _rate,uint256 _cap, string memory _name, string memory _description, string memory _imageHash) public returns(address) {
        uint ownerBalance = this.balanceOf(this.owner());

        Project newProject = new Project(_rate, msg.sender, this, _cap, _name, _description, _imageHash );
        address projectAddress = address(newProject);

        uint newProjectId = projectCount;
        projects[newProjectId] = projectAddress;
        projectCount++;
        
        emit LogProject(_name, projectAddress, owner, ownerBalance);
        
        return projectAddress;
    }

    /** @dev returns address of project by project id
      * @param projectId of project to be retrieved
      * @return address of Project
     **/
    function getProject(uint projectId) public view returns (address) {
        return projects[projectId];
    }
    
    function () external {
        revert();
    }
}