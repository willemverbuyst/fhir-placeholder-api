import organization_1 from "../fixtures/organization_1.json";
import organization_10 from "../fixtures/organization_10.json";
import organization_11 from "../fixtures/organization_11.json";
import organization_12 from "../fixtures/organization_12.json";
import organization_13 from "../fixtures/organization_13.json";
import organization_2 from "../fixtures/organization_2.json";
import organization_3 from "../fixtures/organization_3.json";
import organization_4 from "../fixtures/organization_4.json";
import organization_5 from "../fixtures/organization_5.json";
import organization_6 from "../fixtures/organization_6.json";
import organization_7 from "../fixtures/organization_7.json";
import organization_8 from "../fixtures/organization_8.json";
import organization_9 from "../fixtures/organization_9.json";

describe("organization.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add organization_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_6 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_6));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_7 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_7));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_8 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_8));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_9 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_9));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_10 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_10));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_11 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_11));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_12 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_12));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add organization_13 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(organization_13));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
