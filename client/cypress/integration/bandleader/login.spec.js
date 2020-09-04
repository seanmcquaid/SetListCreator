describe("Bandleader Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/bandleaderLogin");

    cy.registerBandleader();
  });

  afterEach(() => {
    cy.deleteUser("testbandleader1234");
  });

  it("Successfully logs a user in and redirects to Bandleader Home", () => {
    cy.get("[data-testid=UsernameTextInput]")
      .should("be.visible")
      .type("testbandleader1234");

    cy.get("[data-testid=UsernameTextInput]").should(
      "have.value",
      "testbandleader1234"
    );

    cy.get("[data-testid=PasswordTextInput]")
      .should("be.visible")
      .type("password1234");

    cy.get("[data-testid=PasswordTextInput]").should(
      "have.value",
      "password1234"
    );

    cy.get("[data-testid=LoginButton]").should("be.visible").click();

    cy.contains("Band Leader Home Page").should("be.visible");
  });
});
