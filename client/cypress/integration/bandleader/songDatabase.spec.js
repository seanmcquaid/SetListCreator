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

    cy.get('[data-testid="Song NameTextInput"]')
      .should("be.visible")
      .type("Uptown Funk");

    cy.get('[data-testid="Song NameTextInput"]').should(
      "have.value",
      "Uptown Funk"
    );

    cy.get('[data-testid="Artist NameTextInput"]')
      .should("be.visible")
      .type("Bruno Mars");

    cy.get('[data-testid="Artist NameTextInput"]').should(
      "have.value",
      "Bruno Mars"
    );

    cy.get("[data-testid=KeyTextInput]").should("be.visible").type("F Major");

    cy.get("[data-testid=KeyTextInput]").should("have.value", "F Major");

    cy.get('[data-testid="Add SongButton"]').should("be.visible").click();

    cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");
  });

  it("Delete Song", () => {
    cy.get('[data-testid="Add Songs To Your DatabaseLinkButton"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="Song NameTextInput"]')
      .should("be.visible")
      .type("Uptown Funk");

    cy.get('[data-testid="Song NameTextInput"]').should(
      "have.value",
      "Uptown Funk"
    );

    cy.get('[data-testid="Artist NameTextInput"]')
      .should("be.visible")
      .type("Bruno Mars");

    cy.get('[data-testid="Artist NameTextInput"]').should(
      "have.value",
      "Bruno Mars"
    );

    cy.get("[data-testid=KeyTextInput]").should("be.visible").type("F Major");

    cy.get("[data-testid=KeyTextInput]").should("have.value", "F Major");

    cy.get('[data-testid="Add SongButton"]').should("be.visible").click();

    cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");

    cy.get("[data-testid=RemoveButton]").should("be.visible").click();

    cy.get('[data-testid="Uptown FunkInfoContainer"]').should("not.be.visible");
  });

  it("Edit Song", () => {
    cy.get('[data-testid="Add Songs To Your DatabaseLinkButton"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="Song NameTextInput"]')
      .should("be.visible")
      .type("Uptown Funk");

    cy.get('[data-testid="Song NameTextInput"]').should(
      "have.value",
      "Uptown Funk"
    );

    cy.get('[data-testid="Artist NameTextInput"]')
      .should("be.visible")
      .type("Bruno Mars");

    cy.get('[data-testid="Artist NameTextInput"]').should(
      "have.value",
      "Bruno Mars"
    );

    cy.get("[data-testid=KeyTextInput]").should("be.visible").type("F Major");

    cy.get("[data-testid=KeyTextInput]").should("have.value", "F Major");

    cy.get('[data-testid="Add SongButton"]').should("be.visible").click();

    cy.get('[data-testid="Uptown FunkInfoContainer"]').should("be.visible");

    cy.get("[data-testid=EditLinkButton]").should("be.visible").click();

    cy.get('[data-testid="Song NameTextInput"]').should(
      "have.value",
      "Uptown Funk"
    );

    cy.get('[data-testid="Artist NameTextInput"]').should(
      "have.value",
      "Bruno Mars"
    );

    cy.get("[data-testid=KeyTextInput]").should("have.value", "F Major");

    cy.get('[data-testid="Song NameTextInput"]')
      .should("be.visible")
      .type(" It Up");

    cy.get('[data-testid="Song NameTextInput"]').should(
      "have.value",
      "Uptown Funk It Up"
    );

    cy.get('[data-testid="Edit SongButton"]').should("be.visible").click();

    cy.get('[data-testid="Uptown Funk It UpInfoContainer"]').should(
      "be.visible"
    );
  });
});
