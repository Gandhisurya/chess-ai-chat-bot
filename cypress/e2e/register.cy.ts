describe("Example Test", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should register with valid credentials", () => {
    cy.get('input[placeholder="User name"]').type("Gandhi");
    cy.get('input[placeholder="Email"]').type("gandhisurya@gmail.com");
    cy.get('input[placeholder="password"]').type("JingySangy");
    cy.get('input[placeholder="Confirm password"]').type("JingySangy");
    cy.get('button[type="submit"]').click({ force: true });
    // cy.url().should("eq", Cypress.config().baseUrl + "/chat");
  });

  //   it("should show an error for invalid credentials", () => {
  //     cy.get('input[placeholder="Email"]').type("wrong@example.com");
  //     cy.get('input[placeholder="password"]').type("JingySangy");
  //     cy.get('input[placeholder="Confirm password"]').type("JingySangy");
  //     cy.get('button[type="submit"]').click();

  //     // cy.contains("Invalid credentials").should("be.visible");
  //   });
});
