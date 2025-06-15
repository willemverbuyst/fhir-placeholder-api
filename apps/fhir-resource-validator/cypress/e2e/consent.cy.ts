import consent_1 from "../fixtures/consent_1.json";
import consent_10 from "../fixtures/consent_10.json";
import consent_11 from "../fixtures/consent_11.json";
import consent_12 from "../fixtures/consent_12.json";
import consent_2 from "../fixtures/consent_2.json";
import consent_3 from "../fixtures/consent_3.json";
import consent_4 from "../fixtures/consent_4.json";
import consent_5 from "../fixtures/consent_5.json";
import consent_6 from "../fixtures/consent_6.json";
import consent_7 from "../fixtures/consent_7.json";
import consent_8 from "../fixtures/consent_8.json";
import consent_9 from "../fixtures/consent_9.json";

describe("consent.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add consent_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_6 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_6));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_7 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_7));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_8 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_8));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_9 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_9));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_10 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_10));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_11 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_11));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add consent_12 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(consent_12));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
