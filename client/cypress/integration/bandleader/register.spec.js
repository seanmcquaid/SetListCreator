describe("Bandleader Register", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/bandleaderRegister");
    });
    
    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });

    it("Successful register redirects bandleader to home page", () => {
        cy.get("[data-testid=UsernameTextInput]")
            .should("be.visible")
            .type("testbandleader1234");

        cy.get("[data-testid=UsernameTextInput]")
            .should("have.value", "testbandleader1234");

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

        cy.get("[data-testid=RegisterButton]")
            .should("be.visible")
            .click();

        cy.contains("Band Leader Home Page")
            .should("be.visible");
    });
});