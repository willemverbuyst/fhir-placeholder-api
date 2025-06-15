import person_1 from "../fixtures/person_1.json";
import person_2 from "../fixtures/person_2.json";
import person_3 from "../fixtures/person_3.json";
import person_4 from "../fixtures/person_4.json";
import person_5 from "../fixtures/person_5.json";

describe("person.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add person_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(person_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add person_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(person_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add person_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(person_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add person_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(person_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add person_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(person_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
