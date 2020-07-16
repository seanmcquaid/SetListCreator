describe("Edit Profile", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        
        cy.registerBandleader();

        cy.loginBandleader();
    });

    afterEach(() => {
        cy.deleteUser("testbandleader12345");
    });

    it("Successfully edited profile redirects to Bandleader Home and edits username", () => {
        cy.get('[data-testid="Edit ProfileLinkButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid=headerText]')
            .should("be.visible");

        cy.get('[data-testid="Edit Username HereTextInput"]')
            .should("have.value", "testbandleader1234");

        cy.get('[data-testid="Edit Username HereTextInput"]')
            .should("be.visible")
            .type("5");

        cy.get('[data-testid="Edit Username HereTextInput"]')
            .should("have.value", "testbandleader12345");

        cy.get('[data-testid="Edit New Password HereTextInput"]')
            .should("be.visible")
            .type("newpassword");

        cy.get('[data-testid="Edit New Password HereTextInput"]')
            .should("have.value", "newpassword");

        cy.get('[data-testid="Confirm New Password HereTextInput"]')
            .should("be.visible")
            .type("newpassword");

        cy.get('[data-testid="Confirm New Password HereTextInput"]')
            .should("have.value", "newpassword");

        cy.get('[data-testid="Edit ProfileButton"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid=headerText]')
            .should("be.visible");

        cy.get('[href="/bandleader/editProfile"]')
            .should("be.visible")
            .click();

        cy.get('[data-testid="Edit Username HereTextInput"]')
            .should("have.value", "testbandleader12345");
    });
});