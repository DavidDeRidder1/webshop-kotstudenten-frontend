describe('Add product', () => {

  beforeEach(() => {
    cy.login('david.deridder@student.hogent.be', '12345678');
    
  });

  it("should add a product", () => {

    cy.wait(2000);
    cy.visit("http://localhost:5173/products/add");
    cy.wait(10000);
    cy.get("[data-cy=title_input]").type("Test product");
    cy.get("[data-cy=description_input]").type("This is a test product with category furniture");
    cy.get("[data-cy=picture_input]").type("https://cdn-icons-png.flaticon.com/512/2995/2995440.png");
    cy.get("[data-cy=price_input]").type(25);
    cy.get("[data-cy=submit_product]").click();

    cy.get("[data-cy=product_user]").eq(3).contains("David");
    cy.get("[data-cy=product_price]").eq(3).contains(25);
    cy.get("[data-cy=product_bought]").eq(3).contains("For sale");
    cy.get("[data-cy=product_list] [data-cy=product_container]").should("have.length", 4);

  });

  it("should remove a product", () => {
    cy.visit("http://localhost:5173/products");
    cy.get("[data-cy=product_remove_btn]").eq(3).click();
    cy.get("[data-cy=product_list] [data-cy=product_container]").should("have.length", 3);
  });

  it("should show the error message for an invalid price", () => {
    cy.wait(2000);
    cy.visit("http://localhost:5173/products/add");
    cy.wait(10000);
    cy.get("[data-cy=title_input]").type("Test product");
    cy.get("[data-cy=description_input]").type("This is a test product with category furniture");
    cy.get("[data-cy=picture_input]").type("https://cdn-icons-png.flaticon.com/512/2995/2995440.png");
    cy.get("[data-cy=price_input]").type(-1);
    cy.get("[data-cy=submit_product]").click();

    cy.get("[data-cy=label_input_error]").contains("higher than 0");
  });

  it("should show the error message for an invalid description", () => {
    cy.wait(2000);
    cy.visit("http://localhost:5173/products/add");
    cy.wait(12000);
    cy.get("[data-cy=title_input]").type("Test product");
    cy.get("[data-cy=description_input]").type("a");
    cy.get("[data-cy=picture_input]").type("https://cdn-icons-png.flaticon.com/512/2995/2995440.png");
    cy.get("[data-cy=price_input]").type(25);
    cy.get("[data-cy=submit_product]").click();

    cy.get("[data-cy=description_input_error]").contains("2 characters");
  });
});