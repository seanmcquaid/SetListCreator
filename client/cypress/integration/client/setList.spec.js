describe("Proposed Set List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.registerClient();
    cy.registerBandleader();
  });

  beforeEach(() => {
    cy.server();

    cy.getClientInfo().then(({ clientToken }) => {
      cy.request({
        url: "/users/sendClientSetList",
        method: "PATCH",
        body: { setListAvailability: true },
        headers: {
          Authorization: clientToken,
        },
      });
    });

    cy.loginClient();
  });

  beforeEach(() => {
    cy.server();

    cy.getClientInfo().then(({ clientId }) => {
      const requestBody = {
        clientId,
        bandleaderComments: ["Band Leader Comments Here"],
        completedSetList: [
          {
            songname: "Uptown Funk",
            artistname: "Bruno Mars",
            id: 1,
          },
        ],
      };

      cy.getBandleaderInfo().then(({ bandleaderToken }) => {
        cy.request({
          url: "/bandleader/postCompletedSetList",
          method: "POST",
          body: requestBody,
          headers: {
            Authorization: bandleaderToken,
          },
        });
      });
    });
  });

  afterEach(() => {
    cy.deleteUser("testclient1234");
  });

  afterEach(() => {
    cy.deleteUser("testbandleader1234");
  });

  afterEach(() => {
    cy.deleteAllClientSongsAndSetList("testclient1234", "testbandleader1234");
  });

  it("Client Approves - Go to Final Set List Page", () => {
    cy.get('[data-testid="Look at Proposed SetListLinkButton"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="Add CommentsTextInput"]')
      .should("be.visible")
      .type("Looks great");

    cy.get('[data-testid="Add CommentsTextInput"]').should(
      "have.value",
      "Looks great"
    );

    cy.get('[data-testid="Add CommentButton"]').should("be.visible").click();

    cy.get('[data-testid="Send Comments And ApprovalButton"]')
      .should("be.visible")
      .click();

    cy.get('[data-testid="Look at Proposed SetListLinkButton"]')
      .should("be.visible")
      .click();

    cy.get("[data-testid=songList]").should("be.visible");
  });
});
