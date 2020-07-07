describe("Bandleader Login", () => {
    beforeEach(() => {
        cy.server();

        cy.request("POST", "/users/register/client", {
            username : "testbandleader1234",
            password : "password1234",
            selectedBandleader : "testbandleader",
        });
    });

    it("Successfully logs a user in and redirects to Bandleader Home", () => {
        cy.visit("http://localhost:3000");

        cy.get("[data-testid=BandleaderLinkButton]").click();

        cy.get("[data-testid=UsernameTextInput]").type("testbandleader");
        cy.get("[data-testid=PasswordTextInput]").type("password1234");

        cy.get('[data-testid=LoginButton]').click();
    });

    
});