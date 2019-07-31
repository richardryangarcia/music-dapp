const Project = artifacts.require("./Project.sol");
const Artist = artifacts.require("./Artist.sol")
  

contract('Project', (accounts) => {

    let artist;
    let account2 = accounts[1];
    let account3 = accounts[2];
    let project;
    let projectCapInWei =  1000000000000000;
    let artistOwner;


    beforeEach(async () => {
        artist = await Artist.new("Kanye West", "kw1", 18, "rap/r&b", "dat yeezus boi from the Chi", "the Chi", "QWKJHGDFUKYGWHKJWGEKGKJWJ");
        artistOwner = await artist.owner();
        project = await Project.new(1, artistOwner, artist.address, projectCapInWei, "Graduation", "3rd studio album", "QCXVBNNJGFGDFGHRGHJMVTHG")
    }); 

    it("have accurate values", async () => {
        let projectDetails = await project.fetchProject();

        assert.equal(artistOwner, projectDetails.owner);
        assert.equal("Graduation", projectDetails.name);
        assert.equal("3rd studio album", projectDetails.description);
        assert.equal(1, projectDetails.rate);
        assert.equal(artistOwner, projectDetails.ownerWallet);
    });

    it("should process token purchase ", async () => {
        await artist.addMinter(project.address);

        const initialTotalSupply = await artist.totalSupply();
        const intialUserBalance = await artist.balanceOf(account3);

        await project.sendTransaction( {from: account3, value: 10000})

        const finalTotalSupply = await artist.totalSupply();
        const finalUserBalance = await artist.balanceOf(account3);

        assert.equal(initialTotalSupply.toString(), 0)
        assert.equal(intialUserBalance.toString(), 0)
        assert.equal(finalTotalSupply.toString(), 10000)
        assert.equal(finalUserBalance.toString(), 10000)
    })

    it("should process token purchase && buy merch from store ", async () => {
        await artist.addMerch("tshirt", "dope tshirt", 20, 100, "QWSFBSDFGSDREGDFGSF");
        let merch = await artist.getMerch(0);
        await artist.addMinter(project.address);
        await project.sendTransaction( {from: account3, value: 10000})

        const initialQuantity = merch.quantity;
        const initialUserBalance = await artist.balanceOf(account3);
        assert.equal(initialUserBalance.toString(), 10000)
        assert.equal(initialQuantity.toString(), 20)

        await artist.buyMerch(0, 1, 100, { from: account3 })

        merch = await artist.getMerch(0);
        const newQuantity = merch.quantity;
        const newUserBalance = await artist.balanceOf(account3);

        assert.equal(newUserBalance.toString(), 9900)
        assert.equal(newQuantity.toString(), 19)




        

    

    })
});