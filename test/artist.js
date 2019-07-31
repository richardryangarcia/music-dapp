const Artist = artifacts.require("./Artist.sol");

contract('Artist', (accounts) => {

    let instance, owner;
    account2 = accounts[1]
    let cap =  1000000000000000;


    beforeEach(async () => {
        instance = await Artist.new("Kanye West", "kw1", 18, "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "QWDSDFGSDGHRSEERWER");
        owner = await instance.owner();
        ownerBalance = await instance.balanceOf(owner);
        totalSupply = await instance.totalSupply();
    }); 


    it("should have the correct values", async () => {
        const artistDetails = await instance.fetchArtist();
    
        assert.equal(artistDetails.name, "Kanye West");
        assert.equal(artistDetails.owner , owner);
        assert.equal(artistDetails.genre , "rap/r&b");
        assert.equal(artistDetails.bio , "dat yeezus boi from the Chi");
        assert.equal(artistDetails.location , "the Chi");
        assert.equal(artistDetails.imageHash , "QWDSDFGSDGHRSEERWER");
        assert.equal(artistDetails.projectCount , 0);
        assert.equal(artistDetails.merchCount , 0);
      });



      describe("create crowdfund project functions" , async () => {
        it("create a project ", async () => {
            let address = null;

            let response = await instance.createProject(1, cap, "Graduation", "3rd full length album", "QLKJHSDAFLIUEIULHLJKHKLJ");

            address = response.logs[0].address;

            assert.isTrue(address != null);
            assert.isTrue(address != '0x0000000000000000000000000000000000000000');
        });

        it("should add project as minter", async () => {
            let address = null;

            let response = await instance.createProject(1, cap, "Graduation", "3rd full length album", "QLKJHSDAFLIUEIULHLJKHKLJ");

            address = response.logs[0].address;

            const initialStatus = await instance.isMinter(address);
            await instance.addMinter(address);
            const finalStatus = await instance.isMinter(address);

            assert.equal(initialStatus, false);
            assert.equal(finalStatus, true);
        });
        

        it("should mint tokens", async () => {
            const oldSupply = await instance.totalSupply();
            
            await instance.mint(account2, 100)
    
            const newSupply = await instance.totalSupply();
    
            assert.equal(oldSupply, 0)
            assert.equal(newSupply, 100)
        })

        it("should pause token contract", async () => {
            let isPaused = await instance.paused();
            assert.equal(isPaused, false);
            await instance.pause();
            isPaused = await instance.paused();
            assert.equal(isPaused, true);
        })
    }) 


    describe("artist store methods", () => {
        it("should intialize correctly", async () => {
            const merchCount = await instance.merchandiseCount();    
            assert.equal(merchCount, 0)
        });
    
        it("should add merch", async () => {
            await instance.addMerch("tshirt", "dope tshirt", 20, 100, "QWESDFSDFASDGREGERG");
            const merchCount = await instance.merchandiseCount();
            const merch = await instance.getMerch(0);

            assert.equal(merchCount, 1);
            assert.equal(merch.name, "tshirt");
            assert.equal(merch.description, "dope tshirt");
            assert.equal(merch.quantity, 20);
            assert.equal(merch.price, 100);
            assert.equal(merch.imageUrl, "QWESDFSDFASDGREGERG");
            assert.equal(merch.isAvailable, true);
        })
    
        it("make merch unavailable then available", async () => {
            await instance.addMerch("tshirt", "dope tshirt", 20, 15.00, "");
            await instance.makeMerchUnavailable(0);
    
            let unavailableMerch = await instance.merchandise(0);
    
            assert.equal(unavailableMerch.isAvailable, false);
    
            await instance.makeMerchAvailable(0);
            let availableMerch = await instance.merchandise(0);
    
            assert.equal(availableMerch.isAvailable, true);
        })
    })   
});