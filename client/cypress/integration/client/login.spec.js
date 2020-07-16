describe("Client Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/clientLogin");

        cy.registerClient();
    });

    beforeEach(() => {
        cy.registerBandleader();
    });

    afterEach(() => {
        cy.deleteUser("testclient1234");
    });
    
    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });

    it("Successfully logs a user in and redirects to Client Home", () => {

        cy.get("[data-testid=UsernameTextInput]")
            .should("be.visible")
            .type("testclient1234");

        cy.get("[data-testid=UsernameTextInput]")
            .should("have.value", "testclient1234");

        cy.get("[data-testid=PasswordTextInput]")
            .should("be.visible")
            .type("password1234");

        cy.get("[data-testid=PasswordTextInput]")
            .should("have.value", "password1234");

        cy.get('[data-testid=LoginButton]')
            .should("be.visible")
            .click();

        cy.contains('Musical Preferences Page')
            .should("be.visible");
    });

});