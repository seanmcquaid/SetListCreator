describe("Client Profile", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.registerClient();
    });

    beforeEach(() => {
        cy.registerBandleader();

        cy.loginClient();
    });

    afterEach(() => {
        cy.deleteUser("editTestClient1234");
    });
    
    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });
    it("Successfully edited profile redirects to Client Home", () => {
        cy.get('[href="/client/editProfile"]').click();

        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testclient1234");

        cy.get('[data-testid="Edit Username HereTextInput"]').focus().clear();

        cy.get('[data-testid="Edit Username HereTextInput"]').type("editTestClient1234");

        cy.get('[data-testid="Edit New Password HereTextInput"]').type("newpassword");

        cy.get('[data-testid="Confirm New Password HereTextInput"]').type("newpassword");

        cy.get('[data-testid="Edit ProfileButton"]').click();
    });
});