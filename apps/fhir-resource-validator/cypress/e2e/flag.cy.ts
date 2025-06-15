import flag_1 from "../fixtures/flag_1.json";
import flag_2 from "../fixtures/flag_2.json";

describe("flag.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add flag_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(flag_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add flag_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(flag_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
