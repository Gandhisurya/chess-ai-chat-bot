describe("Example Test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login with valid credentials", () => {
    cy.get('input[placeholder="Email"]').type("arivusurya@gmail.com");
    cy.get('input[placeholder="Password"]').type("Jingysangy");
    cy.get('button[type="submit"]').click({ force: true });
    // cy.url().should("eq", Cypress.config().baseUrl + "/chat");
  });

  it("should show an error for invalid credentials", () => {
    cy.get('input[placeholder="Email"]').type("wrong@example.com");
    cy.get('input[placeholder="Password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // cy.contains("Invalid credentials").should("be.visible");
  });
});
