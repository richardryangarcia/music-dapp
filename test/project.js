const Project = artifacts.require("./Project.sol");
const Artist = artifacts.require("./Artist.sol")
  

contract('Project', (accounts) => {

    let artist;
    let account1 = accounts[0];
    let account2 = accounts[1];
    let project;
    let projectCapInWei =  1000000000000000;
    let initialSupply = 100000000000;
    let artistOwner;
    let ownerBalance;
    let totalSupply;


    beforeEach(async () => {
        artist = await Artist.new("Kanye West", "kw1", 18, "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "kanyewest.com");
        artistOwner = await artist.owner();

        project = await Project.new(1, artistOwner, artist.address, projectCapInWei, "Graduation", "3rd studio album")

        await artist.transfer(project.address, initialSupply);
    }); 

    it("have accurate values", async () => {
        let owner = await project.owner();
        let name = await project.name();
        let description = await project.description();

        assert.equal(owner, artistOwner);
        assert.equal(name, "Graduation");
        assert.equal(description, "3rd studio album");
    });

    it("should process token purchase", async () => {
        let amountRaised = await project.weiRaised();
        let account2Balance = await artist.balanceOf(account2);
        let contractBalance = await artist.balanceOf(project.address)

        await project.sendTransaction({ value: 100, from: account2 });

        newAccount2Balance = await artist.balanceOf(account2);
        newAmountRaised = await project.weiRaised();
        newContractBalance = await artist.balanceOf(project.address)

        assert.isTrue(parseInt(newContractBalance.toString()) < parseInt(contractBalance.toString()), "crowdfund contract should have less tokens after account2 purchases tokens");
        assert.isTrue(parseInt(newAccount2Balance.toString()) > parseInt(account2Balance.toString()), "buyer new balance should be greater than before");
        assert.isTrue(parseInt(newAmountRaised.toString()) > parseInt(amountRaised.toString()), "crowdfund amount raised should be greater than before sendTransaction");

    });


});