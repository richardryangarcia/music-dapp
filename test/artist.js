const Artist = artifacts.require("./Artist.sol");

contract('Artist', (accounts) => {

    let instance, owner, ownerBalance, totalSupply;
    let account1 = accounts[0];
    let account2 = accounts[1];
    let cap =  1000000000000000;

    beforeEach(async () => {
        instance = await Artist.new("Kanye West", "kw1", 18, "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "kanyewest.com");
        owner = await instance.owner();
        ownerBalance = await instance.balanceOf(owner);
        totalSupply = await instance.totalSupply();
    }); 

    it("should have the correct values", async () => {
        const name = await instance.name();
    
        assert.equal(name, "Kanye West", "The value 89 was not stored.");
        assert.equal(totalSupply, 100000000000);
        assert.equal(ownerBalance, 100000000000);
      });


    describe("artist store methods", () => {
        it("should intialize correctly", async () => {
            const merchCount = await instance.merchandiseCount();    
            assert.equal(merchCount, 0)
        });
    
        it("should add merch", async () => {
            await instance.addMerch("tshirt", "dope tshirt", 20, 15.00, "");
            const merchCount = await instance.merchandiseCount();
            const merch = await instance.merchandise(0);
            const merchName = merch.name;
    
            assert.equal(merchCount, 1);
            assert.equal(merchName, "tshirt");
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
    
        it("create a project and tranfers tokens from owner to crowdsale contract", async () => {
            let ownerBalance = await instance.balanceOf(owner);
            // console.log(ownerBalance.toString());

            let projectAddress = await instance.createProject(1, cap, "Graduation", "3rd full length album");
            console.log(projectAddress.logs[0].args);

            let newOwnerBalance = await instance.balanceOf(owner);
            console.log(newOwnerBalance.toString());
            // let projectBalance = await instance.balanceOf(projectAddress);

            // assert.isTrue(newOwnerBalance < ownerBalance)
            // assert.isTrue(projectBalance > 0);
 
        });
    })    
});