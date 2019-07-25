pragma solidity 0.5.0;

import "../client/node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./Artist.sol";

contract Project is Crowdsale, CappedCrowdsale {
    address public owner;
    string public name;
    string public image;
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
    constructor(uint256 _rate, address payable _wallet, Artist _artist, uint256 _cap, string memory _name, string memory _description)
    Crowdsale(_rate, _wallet, _artist)
    CappedCrowdsale(_cap)
    public {
        owner = msg.sender;
        name = _name;
        description = _description;
    }

}