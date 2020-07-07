describe("Client Login", () => {
    beforeEach(() => {
        cy.server();

        cy.request("POST", "http://localhost:8000/users/register/client", {
            username : "testclient1234",
            password : "password1234",
            selectedBandleader : "testbandleader1234",
        });
    });

    afterEach(() => {
        cy.request("DELETE", "http://localhost:8000/users/deleteUser", {
            username : "testclient1234",
        });
    });

    it("Successfully logs a user in and redirects to Bandleader Home", () => {
        cy.visit("http://localhost:3000");

        cy.get("[data-testid=ClientLinkButton]").click();

        cy.get("[data-testid=UsernameTextInput]").type("testclient1234");
        cy.get("[data-testid=PasswordTextInput]").type("password1234");

        cy.get('[data-testid=LoginButton]').click();

        cy.contains('Musical Preferences Page').should("be.visible");
    });

});