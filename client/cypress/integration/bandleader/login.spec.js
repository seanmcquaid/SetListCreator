describe("Bandleader Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        
        cy.server();

        cy.request("POST", "/users/register/bandleader", {
            username : "testbandleader1234",
            password : "password1234",
        });
    });

    afterEach(() => {
        cy.server();

        cy.request("DELETE", "/users/deleteUser", {
            username : "testbandleader1234",
        });

        cy.clearLocalStorage();
    });

    it("Successfully logs a user in and redirects to Bandleader Home", () => {
        cy.visit("http://localhost:3000");

        cy.get("[data-testid=BandleaderLinkButton]").click();

        cy.get("[data-testid=UsernameTextInput]").type("testbandleader1234");
        cy.get("[data-testid=PasswordTextInput]").type("password1234");

        cy.get("[data-testid=LoginButton]").click();

        cy.contains("Band Leader Home Page").should("be.visible");
    });

    
});