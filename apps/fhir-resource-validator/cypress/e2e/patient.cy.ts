import patient_1 from "../fixtures/patient_1.json";
import patient_10 from "../fixtures/patient_10.json";
import patient_11 from "../fixtures/patient_11.json";
import patient_12 from "../fixtures/patient_12.json";
import patient_13 from "../fixtures/patient_13.json";
import patient_14 from "../fixtures/patient_14.json";
import patient_15 from "../fixtures/patient_15.json";
import patient_16 from "../fixtures/patient_16.json";
import patient_17 from "../fixtures/patient_17.json";
import patient_18 from "../fixtures/patient_18.json";
import patient_19 from "../fixtures/patient_19.json";
import patient_2 from "../fixtures/patient_2.json";
import patient_20 from "../fixtures/patient_20.json";
import patient_21 from "../fixtures/patient_21.json";
import patient_22 from "../fixtures/patient_22.json";
import patient_23 from "../fixtures/patient_23.json";
import patient_24 from "../fixtures/patient_24.json";
import patient_3 from "../fixtures/patient_3.json";
import patient_4 from "../fixtures/patient_4.json";
import patient_5 from "../fixtures/patient_5.json";
import patient_6 from "../fixtures/patient_6.json";
import patient_7 from "../fixtures/patient_7.json";
import patient_8 from "../fixtures/patient_8.json";
import patient_9 from "../fixtures/patient_9.json";

describe("patient.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add patient_1 and have a successfull validation with warnings", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_1));
    cy.get("#validateBtn").click();
    cy.get("#message > :nth-child(1) > h4").should("contain", "WARNING #1");
    cy.get(":nth-child(1) > p").should(
      "contain",
      "contact,0,name: Unrecognized key(s) in object: '_family'",
    );
    cy.get("#message > :nth-child(2) > h4").should("contain", "WARNING #2");
    cy.get(":nth-child(2) > p").should(
      "contain",
      "Unrecognized key(s) in object: '_birthDate'",
    );
  });

  it("should add patient_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_3 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_3));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_gender'",
    );
  });

  it("should add patient_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_6 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_6));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_gender'",
    );
  });

  it("should add patient_7 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_7));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_8 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_8));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_9 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_9));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_10 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_10));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_11 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_11));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_gender'",
    );
  });

  it("should add patient_12 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_12));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_13 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_13));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_14 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_14));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_15 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_15));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_16 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_16));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_17 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_17));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_18 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_18));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_19 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_19));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_birthDate'",
    );
  });

  it("should add patient_20 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_20));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_21 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_21));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_birthDate'",
    );
  });

  it("should add patient_22 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_22));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_birthDate'",
    );
  });

  it("should add patient_23 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_23));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_24 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_24));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
