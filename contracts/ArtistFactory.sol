pragma solidity 0.5.8;
import './Artist.sol';

contract ArtistFactory {
    address owner;
    uint public artistCount;
    mapping (uint => address) public artists;

    event LogArtistAdded(uint newArtistId, string name, string symbol);

    constructor()
    public {
        owner = msg.sender;
        artistCount = 0;
    }

    function addArtist(string memory _name, string memory _symbol, string memory _genre, string memory _bio, string memory _location, string memory _url) 
    public  
    returns(uint) {
        Artist newArtist = new Artist(_name, _symbol, 18, _genre, _bio, _location, _url);
        uint newArtistId = artistCount;
        artists[newArtistId] = address(newArtist);
        emit LogArtistAdded(newArtistId, _name, _symbol);
        artistCount++;
        return newArtistId;
    }

    function getArtist(uint artistId) public view returns (address) {
        return artists[artistId];
    }

    function getLatestArtists(uint numberOfArtists) public view returns(address[] memory _artistArray) {
         _artistArray = new address[](numberOfArtists);

            for(uint i=0; i < artistCount; i++){
                _artistArray[i] = artists[i];
            }

        return _artistArray;
    }
    
}