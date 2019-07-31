pragma solidity 0.5.8;

import "../client/node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./Artist.sol";

contract Project is Crowdsale, CappedCrowdsale {
    address public owner;
    string public name;
    string public imageHash;
    string public description;
    Artist public artist;

    /** @dev Project constructor
      * @param _rate  How many token units a buyer gets per wei.
                      The rate is the conversion between wei and the smallest and indivisible token unit.
                      So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
                      1 wei will give you 1 unit, or 0.001 TOK.
      * @param _wallet the address where funds are collected.
      * @param _artist Artist (Token) to be dispersed when a user contributes to crowdfund
      * @param _cap amount in wei that is crowdsale is trying to reach.
      * @param _name name of Project.
      * @param _description description of Project.
      * @param _imageHash ipfsHash of Project image.
     **/
    constructor(uint256 _rate, address payable _wallet, Artist _artist, uint256 _cap, string memory _name, string memory _description, string memory _imageHash)
    Crowdsale(_rate, _wallet, _artist)
    CappedCrowdsale(_cap)
    public {
        owner = msg.sender;
        name = _name;
        description = _description;
        imageHash = _imageHash;
        artist = _artist;
    }

    /** @dev returns project details 
      * @return owner of Project.
      * @return name of Project.
      * @return imageHash of Project.
      * @return description of Project.
      * @return rate of Project.
      * @return ownerWallet of Project.
      * @return cap of Project.
      * @return weiRaised of Project.
      * @return capReached of Project.
      
     **/
    function fetchProject() public view 
    returns (address owner,string memory name, string memory imageHash,string memory description, uint256 rate, address ownerWallet, uint256 cap, uint256 weiRaised, bool capReached)
    {
        owner = this.owner();
        name = this.name();
        imageHash = this.imageHash();
        description = this.description();
        rate = this.rate();
        ownerWallet = this.wallet();
        cap = this.cap();
        weiRaised = this.weiRaised();
        capReached = this.capReached();

        return ( owner, name, imageHash, description, rate, ownerWallet, cap, weiRaised, capReached);
    }

    /** @dev override _processPurchase function to allow minting of Artist Tokens at time of purchase
      * @param beneficiary Address receiving the tokens
      * @param tokenAmount Number of tokens to be purchased
     **/
    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        artist.mint(beneficiary, tokenAmount);
    }
}