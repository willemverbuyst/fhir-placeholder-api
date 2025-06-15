import group_1 from "../fixtures/group_1.json";
import group_2 from "../fixtures/group_2.json";
import group_3 from "../fixtures/group_3.json";
import group_4 from "../fixtures/group_4.json";

describe("group.cy.ts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add group_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(group_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add group_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(group_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add group_3 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(group_3));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add group_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(group_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
