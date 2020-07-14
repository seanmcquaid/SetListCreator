describe("Proposed Set List", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.registerClient();
    });

    beforeEach(() => {
        cy.registerBandleader();

        cy.loginClient();
    });

    beforeEach(() => {
        cy.server();

        cy.getClientToken()
            .then(({clientToken}) => {
                cy.request({
                    url : "/users/sendClientSetList",
                    method : "PATCH",
                    body : {setListAvailability : true},
                    auth : clientToken
                });
            });
    });

    beforeEach(() => {
        cy.server();

        // add suggested set list
        // /postCompletedSetList

        cy.getBandleaderToken()
            .then()
    });

    afterEach(() => {
        cy.deleteUser("testclient1234");
    });
    
    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });

    afterEach(() => {
        cy.deleteAllClientSongsAndSetList("testclient1234", "testbandleader1234");
    });

    describe('Name of the group', () => {
        
    });

    describe('Name of the group', () => {
        
    });
    
    it("Client Approves - Go to Final Set List Page", () => {

    });

    it("Client Doesn't approve", () => {

    });
});