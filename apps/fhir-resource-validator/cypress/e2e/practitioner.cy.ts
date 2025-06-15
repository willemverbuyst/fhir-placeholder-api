import practitioner_1 from "../fixtures/practitioner_1.json";
import practitioner_10 from "../fixtures/practitioner_10.json";
import practitioner_11 from "../fixtures/practitioner_11.json";
import practitioner_12 from "../fixtures/practitioner_12.json";
import practitioner_13 from "../fixtures/practitioner_13.json";
import practitioner_14 from "../fixtures/practitioner_14.json";
import practitioner_15 from "../fixtures/practitioner_15.json";
import practitioner_2 from "../fixtures/practitioner_2.json";
import practitioner_3 from "../fixtures/practitioner_3.json";
import practitioner_4 from "../fixtures/practitioner_4.json";
import practitioner_5 from "../fixtures/practitioner_5.json";
import practitioner_6 from "../fixtures/practitioner_6.json";
import practitioner_7 from "../fixtures/practitioner_7.json";
import practitioner_8 from "../fixtures/practitioner_8.json";
import practitioner_9 from "../fixtures/practitioner_9.json";

describe("practitioner.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add practitioner_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_6 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_6));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_7 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_7));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_8 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_8));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_9 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_9));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_10 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_10));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_11 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_11));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_12 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_12));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_13 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_13));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_14 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_14));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add practitioner_15 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitioner_15));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
