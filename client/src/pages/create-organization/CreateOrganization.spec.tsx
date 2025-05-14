import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrganization } from "./CreateOrganization";

describe("CreateOrganization", () => {
  let nameInput: HTMLInputElement;
  let descriptionInput: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    render(<CreateOrganization />);

    nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    descriptionInput = screen.getByLabelText(
      /description/i,
    ) as HTMLInputElement;
    button = screen.getByRole("button", { name: /submit/i });
  });

  it("should render app with the title visible", () => {
    expect(screen.getByText(/Create a new organization/i)).toBeDefined();
  });

  it("should render with 2 input fields and a button", () => {
    expect(nameInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(button).toBeDefined();
  });

  it("should render a message with the name of the organization after submitting form correctly", () => {
    fireEvent.change(nameInput, { target: { value: "FooBar" } });
    fireEvent.change(descriptionInput, {
      target: { value: "any_description_123" },
    });
    fireEvent.click(button);

    expect(screen.getByText("You've created FooBar")).toBeDefined();
    expect(screen.getByRole("button", { name: /create new/i })).toBeDefined();
  });

  it("should render an error message when description is missing", () => {
    fireEvent.change(nameInput, { target: { value: "FooBar" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/description is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(descriptionInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when name is missing", () => {
    fireEvent.change(descriptionInput, {
      target: { value: "any_description_123" },
    });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/name is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(nameInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when name is an empty string", () => {
    fireEvent.change(nameInput, { target: { value: " " } });
    fireEvent.change(descriptionInput, {
      target: { value: "any_description_123" },
    });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/name is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(nameInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when description is an empty string", () => {
    fireEvent.change(nameInput, { target: { value: "FooBar" } });
    fireEvent.change(descriptionInput, { target: { value: " " } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/description is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(descriptionInput.matches(":focus")).toBe(true);
  });

  it("should render error messages when both values are missing", () => {
    fireEvent.click(button);

    const errorMessagePassword = screen.getByText(/description is missing/i);

    expect(errorMessagePassword).toBeDefined();
    expect(errorMessagePassword).toHaveStyle({ color: "rgb(255, 0, 0)" });

    const errorMessageUserName = screen.getByText(/name is missing/i);

    expect(errorMessageUserName).toBeDefined();
    expect(errorMessageUserName).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(nameInput.matches(":focus")).toBe(true);
  });

  it("should not render error message for updated input ", () => {
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.click(button);
    fireEvent.change(nameInput, { target: { value: "FooBar" } });
    fireEvent.click(button);

    const notExpectedErrorMessage = screen.queryByText(/name is missing/i);
    expect(notExpectedErrorMessage).not.toBeInTheDocument();

    const errorMessage = screen.getByText(/description is missing/i);
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(descriptionInput.matches(":focus")).toBe(true);
  });

  it("should navigate back to empty form", () => {
    fireEvent.change(nameInput, { target: { value: "FooBar" } });
    fireEvent.change(descriptionInput, {
      target: { value: "any_description_123" },
    });
    fireEvent.click(button);

    const logoutBtn = screen.getByRole("button", { name: /create new/i });

    fireEvent.click(logoutBtn);

    expect(screen.getByText(/Create a new organization/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined();

    const nameInputRevisit = screen.getByLabelText(/name/i) as HTMLInputElement;
    const descriptionInputRevisit = screen.getByLabelText(
      /description/i,
    ) as HTMLInputElement;

    expect(nameInputRevisit.value).toBe("");
    expect(descriptionInputRevisit.value).toBe("");
  });
});
