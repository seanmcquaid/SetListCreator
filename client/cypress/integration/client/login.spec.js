describe("Client Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");

        cy.server();

        cy.request("POST", "/users/register/client", {
            username : "testclient1234",
            password : "password1234",
            selectedBandleader : "testbandleader1234",
        });
    });

    beforeEach(() => {
        cy.server();

        cy.request("POST", "/users/register/bandleader", {
            username : "testbandleader1234",
            password : "password1234",
        });
    });

    afterEach(() => {
        cy.server();

        cy.request("DELETE", "/users/deleteUser", {
            username : "testclient1234",
        });

        cy.clearLocalStorage();
    });
    
    afterEach(() => {
        cy.server();

        cy.request("DELETE", "/users/deleteUser", {
            username : "testbandleader1234",
        });

        cy.clearLocalStorage();
    });

    it("Successfully logs a user in and redirects to Client Home", () => {
        cy.visit("http://localhost:3000");

        cy.get("[data-testid=ClientLinkButton]").click();

        cy.get("[data-testid=UsernameTextInput]").type("testclient1234");
        cy.get("[data-testid=PasswordTextInput]").type("password1234");

        cy.get('[data-testid=LoginButton]').click();

        cy.contains('Musical Preferences Page').should("be.visible");
    });

});