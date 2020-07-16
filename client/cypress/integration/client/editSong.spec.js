describe("Edit Song", () => {

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

    it("Successfully edits song and displays on client home", () => {
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
        
        cy.get('[data-testid=EditLinkButton]')
            .should("be.visible")
            .click();

        cy.get('[data-testid=headerText]')
            .should("be.visible");

        cy.get('[data-testid="Song NameTextInput"]')
            .should("have.value", "Uptown Funk");

        cy.get('[data-testid="Artist NameTextInput"]')
            .should("have.value", "Bruno Mars");

        cy.get('[data-testid="Song NameTextInput"]')
            .should("be.visible")
            .type(" It Up");

        cy.get('[data-testid="Song NameTextInput"]')
            .should("have.value", "Uptown Funk It Up");

        cy.get('[data-testid="Submit Edited SongButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Uptown Funk It UpInfoContainer"]')
            .should("be.visible");
    });
});