const ArtistFactory = artifacts.require("./ArtistFactory.sol");

contract('ArtistFactory', (accounts) => {

    let instance;

    beforeEach(async () => {
        instance = await ArtistFactory.new();
    }); 

    it("check initialization", async () => {
        const count = await instance.artistCount();    
        const owner = await instance.owner();    
        assert.equal(count, 0, "artist count should be 0 ");
        assert.equal(owner, accounts[0])
      });

      it("should add artist to mapping", async () => {
          let newArtistId;
          response = await instance.addArtist("Kanye West", "kw1", "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "KJSDLKFJHLKJHALKJHFADSFH")
          newArtistId = response.logs[0].args[0].toString();
          const count = await instance.artistCount();
      
          assert.equal(count, 1, "artist count should be 1 ");
          assert.equal(newArtistId, 0);
      })

      it("should return artist address by address id", async () => {
        let newArtistId;
        response = await instance.addArtist("Kanye West", "kw1", "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "KJSDLKFJHLKJHALKJHFADSFH")
        newArtistId = response.logs[0].args[0].toString();
        artistAddress = await instance.getArtist(newArtistId);
        assert.isTrue(newArtistId != null);
      })
      
});