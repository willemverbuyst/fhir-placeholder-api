import location_1 from "../fixtures/location_1.json";
import location_2 from "../fixtures/location_2.json";
import location_3 from "../fixtures/location_3.json";
import location_4 from "../fixtures/location_4.json";
import location_5 from "../fixtures/location_5.json";
import location_6 from "../fixtures/location_6.json";

describe("location.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add location_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(location_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add location_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(location_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add location_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(location_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add location_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(location_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add location_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(location_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add location_6 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(location_6));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
