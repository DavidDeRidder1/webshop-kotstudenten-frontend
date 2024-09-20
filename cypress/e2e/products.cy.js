describe("Product list", () => {

  beforeEach(() => {
    cy.login('david.deridder@student.hogent.be', '12345678');
  });

  it("should show the products", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/products",
      { fixture: 'products.json' },
    );

    cy.visit("http://localhost:5173");
    cy.get("[data-cy=product_list] [data-cy=product_container]").should("have.length", 1);
    cy.get("[data-cy=product_user]").eq(0).contains("David");
    cy.get("[data-cy=product_price]").eq(0).contains(20);
    cy.get("[data-cy=product_bought]").eq(0).contains("For sale");
  });

  it('should show an error if the API call fails', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/products',
      {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      },
    );
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=axios_error_message').should('exist');
  });

  it("should show a loading indicator for a very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/products",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      },
    ).as("slowResponse");
    cy.visit("http://localhost:5173");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });
})