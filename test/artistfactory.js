const ArtistFactory = artifacts.require("./ArtistFactory.sol");

contract('ArtistFactory', () => {

    let instance;

    beforeEach(async () => {
        instance = await ArtistFactory.new();
    }); 

    it("check initialization", async () => {
        const count = await instance.artistCount();    
        assert.equal(count, 0, "artist count should be 0 ");
      });

      it("should add artist to mapping", async () => {
          await instance.addArtist("Kanye West", "kw1", "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "kanyewest.com")

          const count = await instance.artistCount();
      
          assert.equal(count, 1, "artist count should be 1 ");
      })

      it("should return artist address by address id", async () => {

      })

      it("should return artist id by sender address", async () => {
          
      })
      
});