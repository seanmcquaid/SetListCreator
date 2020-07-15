describe("Client Set List", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.registerClient();
        cy.registerBandleader();
    });

    beforeEach(() => {
        cy.loginBandleader();
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

    afterEach(() => {
        cy.deleteAllBandleaderSongsAndSetList("testclient1234", "testbandleader1234");
    });

    describe("Client Set List Ready", () => {

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
                .then(({clientToken}) => {
                    const requestBody = {
                        songName : "Treasure",
                        artistName : "Bruno Mars",
                    };

                    cy.request({
                        url : "/client/addSong/requestedSong",
                        method : "POST",
                        body : requestBody,
                        headers : {
                            Authorization : clientToken
                        },
                    });
                });
        });

        beforeEach(() => {
            cy.server();

            cy.getBandleaderInfo()
                .then(({bandleaderToken}) => {
                    const requestBody = {
                        songName : "Treasure",
                        artistName : "Bruno Mars",
                        songKey : "F Major",
                    };

                    cy.request({
                        url : "/bandleader/addSong",
                        method : "POST",
                        body : requestBody,
                        headers : {
                            Authorization : bandleaderToken
                        },
                    });
                });
        });

        it("Create Set List For Client", () => {
            cy.get('[data-testid="Client ListLinkButton"]').should("be.visible").click();

            cy.get('[data-testid=testclient1234Info]').should("be.visible");

            cy.get('[data-testid=testclient1234Info] > [data-testid=paragraphText]').should("contain.text", "Ready");

            cy.get('[data-testid="Go To Set List PageButton"]').click();

            cy.waitFor('[data-testid="Create SetlistLinkButton"]');

            cy.get('[data-testid="Create SetlistLinkButton"]').should("be.visible").click();    
            
            cy.get('[data-testid="Send Set List to ClientButton"]').should("be.visible").click();
        }); 
    });

    describe("Complete", () => {
        // set up client songs and back end to mock this client behavior
        it("View Final Set List", () => {

        }); 
    });
});