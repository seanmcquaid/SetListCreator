describe("Client Profile", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");

        cy.registerClient();
    });

    beforeEach(() => {
        cy.registerBandleader();

        cy.loginClient();
    });

    beforeEach(() => {
        cy.getClientToken()
            .then(resp => {console.log(resp)});
    });

    afterEach(() => {
        cy.deleteUser("testClient12345");
    });
    
    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });
    it("Successfully edited profile redirects to Client Home and edits username", () => {
        cy.get('[href="/client/editProfile"]').click();

        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testclient1234");
        cy.get('[data-testid="Edit Username HereTextInput"]').type('5');
        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testclient12345");

        cy.get('[data-testid="Edit New Password HereTextInput"]').type("newpassword");
        cy.get('[data-testid="Edit New Password HereTextInput"]').should("have.value", "newpassword");

        cy.get('[data-testid="Confirm New Password HereTextInput"]').type("newpassword");
        cy.get('[data-testid="Confirm New Password HereTextInput"]').should("have.value", "newpassword");

        cy.get('[data-testid="Edit ProfileButton"]').click();

        cy.contains('Musical Preferences Page').should("be.visible");

        cy.get('[href="/client/editProfile"]').click();

        cy.get('[data-testid="Edit Username HereTextInput"]').should("have.value", "testclient12345");
    });
});