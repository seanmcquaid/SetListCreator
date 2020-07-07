describe("Client Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");

        cy.registerClient();
    });

    beforeEach(() => {
        cy.registerBandleader();
    });

    afterEach(() => {
        cy.deleteClient();
    });
    
    afterEach(() => {
        cy.deleteBandleader();
    });

    it("Successfully logs a user in and redirects to Client Home", () => {
        
        cy.get("[data-testid=ClientLinkButton]").click();

        cy.get("[data-testid=UsernameTextInput]").type("testclient1234");
        cy.get("[data-testid=PasswordTextInput]").type("password1234");

        cy.get('[data-testid=LoginButton]').click();

        cy.contains('Musical Preferences Page').should("be.visible");
    });

});