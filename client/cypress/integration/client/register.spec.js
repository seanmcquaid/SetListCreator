describe("Client Register", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");

        cy.registerBandleader();

        cy.get('[data-testid=ClientLinkButton]').click();

        cy.get('.ClientLoginPage_registerLink__QW1BR').click();
    });
    
    afterEach(() => {
        cy.deleteClient();
    });

    afterEach(() => {
        cy.deleteBandleader();
    });

    it("Successful register redirects client to home page", () => {
        cy.get("[data-testid=UsernameTextInput]").type("testclient1234");

        cy.get("[data-testid=PasswordTextInput]").type("password1234");

        cy.get("[data-testid='Confirm PasswordTextInput']").type("password1234");

        cy.get('[data-testid="Select Your BandleaderDropdown"]').select('testbandleader1234');

        cy.get("[data-testid=RegisterButton]").click();

        cy.contains('Musical Preferences Page').should("be.visible");
    });
});