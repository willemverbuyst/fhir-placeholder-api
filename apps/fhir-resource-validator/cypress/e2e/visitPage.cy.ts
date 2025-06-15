describe("visitPage.cy.ts", () => {
  it("should visit / and find expected elements", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "FHIR R4 Resource Validator");
    cy.get("#resourceInput").should("contain.value", "");
    cy.get("#validateBtn").should("contain", "Validate");
  });
});
