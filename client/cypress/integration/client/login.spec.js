describe("Client Login", () => {
    beforeEach(() => {
        cy.server();

        cy.route("http://localhost:8000/users/register/client").as("registerClient");

        cy.request("POST", "http://localhost:8000/users/register/client", {
            username : "testclient1234",
            password : "password1234",
            selectedBandleader : "testbandleader1234",
        });

        // cy.wait("@registerClient");

        cy.route("http://localhost:8000/users/register/bandleader").as("registerBandleader");

        cy.request("POST", "http://localhost:8000/users/register/bandleader", {
            username : "testbandleader1234",
            password : "password1234",
        });

        // cy.wait("@registerBandleader");
    });

    afterEach(() => {

        cy.route("http://localhost:8000/users/deleteUser").as("deleteUser");

        cy.request("DELETE", "http://localhost:8000/users/deleteUser", {
            username : "testclient1234",
        });

        // cy.wait("@deleteUser");

        cy.request("DELETE", "http://localhost:8000/users/deleteUser", {
            username : "testbandleader1234",
        });

        // cy.wait("@deleteUser");

        localStorage.removeItem("token");
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