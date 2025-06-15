import relatedperson_1 from "../fixtures/relatedperson_1.json";
import relatedperson_2 from "../fixtures/relatedperson_2.json";
import relatedperson_3 from "../fixtures/relatedperson_3.json";
import relatedperson_4 from "../fixtures/relatedperson_4.json";
import relatedperson_5 from "../fixtures/relatedperson_5.json";

describe("relatedperson.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add relatedperson_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(relatedperson_1));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_family'",
    );
  });

  it("should add relatedperson_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(relatedperson_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add relatedperson_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(relatedperson_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add relatedperson_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(relatedperson_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add relatedperson_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(relatedperson_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
