pragma solidity 0.5.8;
import './Artist.sol';

/** @title Artist Factory */
contract ArtistFactory {
    address public owner;
    uint public artistCount;
    mapping (uint => address) public artists;

    event LogArtistAdded(uint newArtistId, string name, string symbol);

    constructor()
    public {
        owner = msg.sender;
        artistCount = 0;
    }

   /** @dev Creates an Artist instance and adds to artist mapping. 
      * @param _name of artist.
      * @param _symbol of artist Token.
      * @param _genre of artist.
      * @param _bio of artist.
      * @param _location of artist.
      * @param _url image hash of artist image.
      * @return newArtistId ID of newly created artist.
      */
    function addArtist(string memory _name, string memory _symbol, string memory _genre, string memory _bio, string memory _location, string memory _url) 
    public  
    returns(uint) {
        Artist newArtist = new Artist(_name, _symbol, 18, _genre, _bio, _location, _url);
        uint newArtistId = artistCount;
        artists[newArtistId] = address(newArtist);
        emit LogArtistAdded(newArtistId, _name, _symbol);
        artistCount++;

        newArtist.addMinter(msg.sender);
        return newArtistId;
    }

    /** @dev returns address of artist by artist id
      * @param artistId of artist to be retrieved
      * @return address of Artist
     **/
    function getArtist(uint artistId) public view returns (address) {
        return artists[artistId];
    }
}