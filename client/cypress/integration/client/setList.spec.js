describe("Proposed Set List", () => {
    let clientId;

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

        cy.getClientInfo()
            .then(({clientToken}) => {

                cy.request({
                    url : "/users/sendClientSetList",
                    method : "PATCH",
                    body : {setListAvailability : true},
                    headers : {
                        Authorization : clientToken
                    },
                });
            });
    });

    beforeEach(() => {
        cy.server();

        cy.getClientInfo()
            .then(({clientId}) => {
                const requestBody = {
                    clientId,
                    bandleaderComments : [
                        "Band Leader Comments Here",
                    ], 
                    completedSetList : [
                        {
                            songname : "Uptown Funk",
                            artistname : "Bruno Mars",
                            id : 1
                        },
                    ],
                };
        
                cy.getBandleaderInfo()
                    .then(({bandleaderToken}) => {
                        cy.request({
                            url : "/bandleader/postCompletedSetList",
                            method : "POST",
                            body : requestBody,
                            headers : {
                                Authorization : bandleaderToken,
                            },
                        });
                    });
            });
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