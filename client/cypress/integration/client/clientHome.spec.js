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
        cy.deleteClient();
    });
    
    afterEach(() => {
        cy.deleteBandleader();
    });

    it("Add Song - Requested", () => {
        cy.get('[data-testid="Requested Song NameTextInput"]').type("Uptown Funk");
        cy.get('[data-testid="Requested Artist NameTextInput"]').type("Bruno Mars");

        cy.get('[data-testid="Add Requested SongButton"]').click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");

        cy.get('[data-testid=RemoveButton]').click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]').should("not.be.visible");
    });

    it("Add Song - Do Not Play", () => {
        cy.get('[data-testid="Do Not Play Song NameTextInput"]').type("Treasure");
        cy.get('[data-testid="Do Not Play Artist NameTextInput"]').type("Bruno Mars");

        cy.get('[data-testid="Add Do Not Playlist SongButton"]').click();

        cy.get('[data-testid="TreasureInfoContainer"]').should("be.visible");

        cy.get('[data-testid=RemoveButton]').click();

        cy.get('[data-testid="TreasureInfoContainer"]').should("not.be.visible");
    });

    it("Send Set List", () => {

    });
});