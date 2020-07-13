describe("Song Database", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        
        cy.registerBandleader();

        cy.loginBandleader();
    });

    afterEach(() => {
        cy.deleteUser("testbandleader1234");
    });

    afterEach(() => {
        cy.deleteAllBandleaderSongsAndSetList(null, "testbandleader1234");
    });

    it("Add Song", () => {
        cy.get('[data-testid="Add Songs To Your DatabaseLinkButton"]').click();

        cy.get('[data-testid="Song NameTextInput"]').type("Uptown Funk");
        cy.get('[data-testid="Song NameTextInput"]').should("have.value", "Uptown Funk");

        cy.get('[data-testid="Artist NameTextInput"]').type("Bruno Mars");
        cy.get('[data-testid="Artist NameTextInput"]').should("have.value", "Bruno Mars");

        cy.get('[data-testid=KeyTextInput]').type("F Major");
        cy.get('[data-testid=KeyTextInput]').should("have.value", "F Major");

        cy.get('[data-testid="Add SongButton"]').click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");
    });

    it("Delete Song", () => {
        cy.get('[data-testid="Add Songs To Your DatabaseLinkButton"]').click();

        cy.get('[data-testid="Song NameTextInput"]').type("Uptown Funk");
        cy.get('[data-testid="Song NameTextInput"]').should("have.value", "Uptown Funk");

        cy.get('[data-testid="Artist NameTextInput"]').type("Bruno Mars");
        cy.get('[data-testid="Artist NameTextInput"]').should("have.value", "Bruno Mars");

        cy.get('[data-testid=KeyTextInput]').type("F Major");
        cy.get('[data-testid=KeyTextInput]').should("have.value", "F Major");

        cy.get('[data-testid="Add SongButton"]').click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");

        cy.get('[data-testid=RemoveButton]').click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]').should("not.be.visible");
    });

    it("Edit Song", () => {
        cy.get('[data-testid="Add Songs To Your DatabaseLinkButton"]').click();

        cy.get('[data-testid="Song NameTextInput"]').type("Uptown Funk");
        cy.get('[data-testid="Song NameTextInput"]').should("have.value", "Uptown Funk");

        cy.get('[data-testid="Artist NameTextInput"]').type("Bruno Mars");
        cy.get('[data-testid="Artist NameTextInput"]').should("have.value", "Bruno Mars");

        cy.get('[data-testid=KeyTextInput]').type("F Major");
        cy.get('[data-testid=KeyTextInput]').should("have.value", "F Major");

        cy.get('[data-testid="Add SongButton"]').click();

        cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");

        cy.get('[data-testid=EditLinkButton]').should("be.visible");
        cy.get('[data-testid=EditLinkButton]').click();

        cy.get('[data-testid="Song NameTextInput"]').should("have.value", "Uptown Funk");

        cy.get('[data-testid="Artist NameTextInput"]').should("have.value", "Bruno Mars");

        cy.get('[data-testid=KeyTextInput]').should("have.value", "F Major");

        cy.get('[data-testid="Song NameTextInput"]').type(" It Up");
        cy.get('[data-testid="Song NameTextInput"]').should("have.value", "Uptown Funk It Up");

        cy.get('[data-testid="Edit SongButton"]').click();

        cy.get('[data-testid="Uptown Funk It UpInfoContainer"]').should("be.visible");
    });
});