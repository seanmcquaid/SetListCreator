describe("Client Register", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");

        cy.registerBandleader();

        cy.get('[data-testid=ClientLinkButton]').click();

        cy.get('.ClientLoginPage_registerLink__QW1BR').click();
    });
    
    afterEach(() => {
        cy.deleteUser("testclient1234");
    });

    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });

    it("Successful register redirects client to home page", () => {
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

        cy.get("[data-testid='Confirm PasswordTextInput']")
            .should("be.visible")
            .type("password1234");

        cy.get("[data-testid='Confirm PasswordTextInput']")
            .should("have.value", "password1234");

        cy.get('[data-testid="Select Your BandleaderDropdown"]')
            .should("be.visible")
            .select('testbandleader1234');

        cy.get('[data-testid="Select Your BandleaderDropdown"]')
            .should("have.value", "testbandleader1234");

        cy.get("[data-testid=RegisterButton]")
            .should("be.visible")
            .click();

        cy.contains('Musical Preferences Page')
            .should("be.visible");
    });
});