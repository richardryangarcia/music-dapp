pragma solidity 0.5.8;

import "../client/node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./Artist.sol";

contract Project is Crowdsale, CappedCrowdsale {
    address public owner;
    string public name;
    string public imageHash;
    string public description;

    /**
     * @param _rate Number of token units a buyer gets per wei
     * @dev The rate is the conversion between wei and the smallest and indivisible
     * token unit. So, if you are using a rate of 1 with a ERC20Detailed token
     * with 3 decimals called TOK, 1 wei will give you 1 unit, or 0.001 TOK.
     * @param _wallet Address where collected funds will be forwarded to
     * @param _artist Address of the artist token being sold
     * @param _cap  maximum amount of wei accepted in the crowdsale.
     * @param _name name of project 
     */
    constructor(uint256 _rate, address payable _wallet, Artist _artist, uint256 _cap, string memory _name, string memory _description, string memory _imageHash)
    Crowdsale(_rate, _wallet, _artist)
    CappedCrowdsale(_cap)
    public {
        owner = msg.sender;
        name = _name;
        description = _description;
        imageHash = _imageHash;
    }

    function fetchProject() public view 
    returns (address owner,string memory name, string memory imageHash,string memory description, uint256 rate, address ownerWallet)
    // ,string memory _name,  string memory _imageHash, string memory _description, uint256 _rate, address _ownerWallet, uint256 _cap, bool _capReached,uint256 _weiRaised) 
    {
        owner = this.owner();
        name = this.name();
        imageHash = this.imageHash();
        description = this.description();
        rate = this.rate();
        ownerWallet = this.wallet();
        // cap = this.cap();
        // _weiRaised = this.weiRaised();
        // capReached = this.capReached();

        return ( owner, name, imageHash, description, rate, ownerWallet);
        // _name, _imageHash, _description, _rate, _ownerWallet, cap, _capReached, _weiRaised);
    }

}