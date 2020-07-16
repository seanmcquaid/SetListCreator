describe("Client Home", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.registerClient();
    });

    beforeEach(() => {
        cy.registerBandleader();

        cy.loginClient();
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

    it("Add Song - Requested", () => {
        cy.get('[data-testid="Requested Song NameTextInput"]')
            .should("be.visible")
            .type("Uptown Funk");

        cy.get('[data-testid="Requested Song NameTextInput"]')
            .should("have.value", "Uptown Funk");

        cy.get('[data-testid="Requested Artist NameTextInput"]')
            .should("be.visible")
            .type("Bruno Mars");

        cy.get('[data-testid="Requested Artist NameTextInput"]')
            .should("have.value", "Bruno Mars");

        cy.get('[data-testid="Add Requested SongButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]')
            .should("be.visible");
    });

    it("Remove Song - Requested", () => {
        cy.get('[data-testid="Requested Song NameTextInput"]')
            .should("be.visible")
            .type("Uptown Funk");

        cy.get('[data-testid="Requested Song NameTextInput"]')
            .should("have.value", "Uptown Funk");

        cy.get('[data-testid="Requested Artist NameTextInput"]')
            .should("be.visible")
            .type("Bruno Mars");

        cy.get('[data-testid="Requested Artist NameTextInput"]')
            .should("have.value", "Bruno Mars");

        cy.get('[data-testid="Add Requested SongButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]')
            .should("be.visible");

        cy.get('[data-testid=RemoveButton]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]')
            .should("not.be.visible");
    });

    it("Add Song - Do Not Play", () => {
        cy.get('[data-testid="Do Not Play Song NameTextInput"]')
            .should("be.visible")
            .type("Treasure");

        cy.get('[data-testid="Do Not Play Song NameTextInput"]')
            .should("have.value", "Treasure");

        cy.get('[data-testid="Do Not Play Artist NameTextInput"]')
            .should("be.visible")
            .type("Bruno Mars");

        cy.get('[data-testid="Do Not Play Artist NameTextInput"]')
            .should("have.value", "Bruno Mars");

        cy.get('[data-testid="Add Do Not Playlist SongButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="TreasureInfoContainer"]')
            .should("be.visible");
    });

    it("Remove Song - Do Not Play", () => {
        cy.get('[data-testid="Do Not Play Song NameTextInput"]')
            .should("be.visible")
            .type("Treasure");

        cy.get('[data-testid="Do Not Play Song NameTextInput"]')
            .should("have.value", "Treasure");

        cy.get('[data-testid="Do Not Play Artist NameTextInput"]')
            .should("be.visible")
            .type("Bruno Mars");

        cy.get('[data-testid="Do Not Play Artist NameTextInput"]')
            .should("have.value", "Bruno Mars");

        cy.get('[data-testid="Add Do Not Playlist SongButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="TreasureInfoContainer"]')
            .should("be.visible");

        cy.get('[data-testid=RemoveButton]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="TreasureInfoContainer"]')
            .should("not.be.visible");
    });

    it("Send Set List", () => {
        cy.get('[data-testid="Requested Song NameTextInput"]')
            .should("be.visible")
            .type("Uptown Funk");

        cy.get('[data-testid="Requested Song NameTextInput"]')
            .should("have.value", "Uptown Funk");

        cy.get('[data-testid="Requested Artist NameTextInput"]')
            .should("be.visible")
            .type("Bruno Mars");

        cy.get('[data-testid="Requested Artist NameTextInput"]')
            .should("have.value", "Bruno Mars");

        cy.get('[data-testid="Add Requested SongButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]')
            .should("be.visible");

        cy.get('[data-testid="Send Set ListLinkButton"]')
            .should("be.visible")
            .click();

        cy.get('.ClientSendSetListPage_clientSendSetListPageContainer__1RYoL > :nth-child(1)')
            .should("be.visible");

        cy.get('[data-testid="Send PlaylistButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Look at Proposed SetListLinkButton"]')
            .should("be.visible");
    });
});