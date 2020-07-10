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
        cy.get('[data-testid="Edit ProfileLinkButton"]').click();

        cy.get('[data-testid=headerText]').should("be.visible");

        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testbandleader1234");

        cy.get('[data-testid="Edit Username HereTextInput"]').type("5");
        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testbandleader12345");

        cy.get('[data-testid="Edit New Password HereTextInput"]').type("newpassword");
        cy.get('[data-testid="Edit New Password HereTextInput"]').should("have.value", "newpassword");

        cy.get('[data-testid="Confirm New Password HereTextInput"]').type("newpassword");
        cy.get('[data-testid="Confirm New Password HereTextInput"]').should("have.value", "newpassword");

        cy.get('[data-testid="Edit ProfileButton"]').click();

        cy.get('[data-testid=headerText]').should("be.visible");

        cy.get('[href="/bandleader/editProfile"]').click();

        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testbandleader12345");
    });
});