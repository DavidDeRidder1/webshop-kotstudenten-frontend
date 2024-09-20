describe("mijn eerste test", () => {

  it("draait de applicatie", () => {
    
    cy.visit('http://localhost:5173');
    cy.get("h1").should("exist"); 
   
  });

  it("should login", () => { 
    cy.login('david.deridder@student.hogent.be', '12345678'); 
  });

  
});

