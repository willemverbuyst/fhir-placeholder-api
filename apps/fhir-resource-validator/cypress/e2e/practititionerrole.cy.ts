import practitionerrole_1 from "../fixtures/practitionerrole_1.json";
import practitionerrole_2 from "../fixtures/practitionerrole_2.json";

describe("practitionerrole.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add practitionerrole_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitionerrole_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitionerrole_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitionerrole_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
