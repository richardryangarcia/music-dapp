const Artist = artifacts.require("./Artist.sol");

contract('Artist', (accounts) => {

    let instance, owner, ownerBalance, totalSupply;
    let account1 = accounts[0];
    let account2 = accounts[1];
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

        it("should process merch purchase correctly", async () => {
            await instance.addMerch("tshirt", "dope tshirt", 20, 100, "");

            const beforeBalance= await instance.balanceOf(account2);
            await instance.increaseAllowance(account2, 100000);
            await instance.transfer(account2, 100000);
            const afterBalance= await instance.balanceOf(account2);

            console.log('account 2 before', beforeBalance.toString());
            console.log('account 2 after', afterBalance.toString());


            // await instance.buyMerch(0, 1,{ from: account2 });

            
            const afterAfterBalance= await instance.balanceOf(account2);
            console.log(afterAfterBalance.toString());



        })

    })   


        describe("create crowdfund project functions" , async () => {
            it("create a project ", async () => {
                let address = null;
    
                let response = await instance.createProject(1, cap, "Graduation", "3rd full length album", "QLKJHSDAFLIUEIULHLJKHKLJ");

                address = response.logs[0].address;

                assert.isTrue(address != null);
                assert.isTrue(address != '0x0000000000000000000000000000000000000000');
            });

            it("should add allowance for Artist contract", async () => {
                let artistAddress = instance.address;
                await instance.increaseAllowance(artistAddress, 100000);
                const artistAllowance = await instance.allowance(owner, artistAddress);
                assert.equal(artistAllowance.toString(), 100000 )
            })

            it("should tranfer Tokens from owner to ERC20 contract ", async () => {
                let artistAddress = instance.address;
                let artistOldBalance = await instance.balanceOf(artistAddress)
                let ownerOldBalance = await instance.balanceOf(owner);

                await instance.transfer(artistAddress, 10000);
                let artistNewBalance = await instance.balanceOf(artistAddress);
                let ownerNewBalance = await instance.balanceOf(owner);

                assert.equal(parseInt(ownerNewBalance.toString()), 99999990000);
                assert.isTrue(parseInt(ownerNewBalance.toString()) < parseInt(ownerOldBalance.toString()));
                assert.equal(parseInt(artistNewBalance.toString()), 10000);
                assert.isTrue(parseInt(artistNewBalance.toString()) > parseInt(artistOldBalance.toString()));
            })

            it("should transfer Tokens from erc20 to crowdsale", async () => {
                let artistAddress = instance.address;
                let response = await instance.createProject(1, cap, "Graduation", "3rd full length album", "QLKJHSDAFLIUEIULHLJKHKLJ");
                let projectAddress = response.logs[0].address;
                
                await instance.increaseAllowance(projectAddress, 100000);
                const projectOldBalance= await instance.balanceOf(projectAddress);
                await instance.transfer(projectAddress, 10000);
                const projectNewBalance= await instance.balanceOf(projectAddress)


                console.log(projectOldBalance.toString());

                console.log(projectNewBalance.toString());


            })
        }) 
});