describe("Register", () => {

  it("should throw error when user exists", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("[data-cy=register_firstName]").type("Test");
    cy.get("[data-cy=register_lastName]").type("User");
    cy.get("[data-cy=register_email]").type("david.deridder@student.hogent.be");
    cy.get("[data-cy=register_password]").type("12345678");
    cy.get("[data-cy=register_confirm_password]").type("12345678");
    cy.get("[data-cy=register_submit]").click();
    cy.get('[data-cy=axios_error_message').should('exist');
  })
  
})