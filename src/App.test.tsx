import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    render(<App />);

    usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
    passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    button = screen.getByRole("button", { name: /submit/i });
  });

  it("should render app with the title visible", () => {
    expect(screen.getByText(/login/i)).toBeDefined();
  });

  it("should render with 2 input fields and a button", () => {
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(button).toBeDefined();
  });

  it("should render a welcome message after submitting form correctly", () => {
    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.change(passwordInput, { target: { value: "any_password_123" } });
    fireEvent.click(button);

    expect(screen.getByText("Welcome John Doe")).toBeDefined();
    expect(screen.getByRole("button", { name: /log out/i })).toBeDefined();
  });

  it("should render an error message when password is missing", () => {
    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/password is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(passwordInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when username is missing", () => {
    fireEvent.change(passwordInput, { target: { value: "any_password_123" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/username is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(usernameInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when username is an empty string", () => {
    fireEvent.change(usernameInput, { target: { value: " " } });
    fireEvent.change(passwordInput, { target: { value: "any_password_123" } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/username is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(usernameInput.matches(":focus")).toBe(true);
  });

  it("should render an error message when password is an empty string", () => {
    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.change(passwordInput, { target: { value: " " } });
    fireEvent.click(button);

    const errorMessage = screen.getByText(/password is missing/i);

    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(passwordInput.matches(":focus")).toBe(true);
  });

  it("should render error messages when both values are missing", () => {
    fireEvent.click(button);

    const errorMessagePassword = screen.getByText(/password is missing/i);

    expect(errorMessagePassword).toBeDefined();
    expect(errorMessagePassword).toHaveStyle({ color: "rgb(255, 0, 0)" });

    const errorMessageUserName = screen.getByText(/username is missing/i);

    expect(errorMessageUserName).toBeDefined();
    expect(errorMessageUserName).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(usernameInput.matches(":focus")).toBe(true);
  });

  it.only("should not render error message for updated input ", () => {
    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(button);
    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.click(button);

    const notExpectedErrorMessage = screen.queryByText(/username is missing/i);
    expect(notExpectedErrorMessage).not.toBeInTheDocument();

    const errorMessage = screen.getByText(/password is missing/i);
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(passwordInput.matches(":focus")).toBe(true);
  });

  it("should navigate back to empty form", () => {
    fireEvent.change(usernameInput, { target: { value: "John Doe" } });
    fireEvent.change(passwordInput, { target: { value: "any_password_123" } });
    fireEvent.click(button);

    const logoutBtn = screen.getByRole("button", { name: /log out/i });

    fireEvent.click(logoutBtn);

    expect(screen.getByText(/login/i)).toBeDefined();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined();

    const usernameInputRevisit = screen.getByLabelText(
      /username/i
    ) as HTMLInputElement;
    const passwordInputRevisit = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    expect(usernameInputRevisit.value).toBe("");
    expect(passwordInputRevisit.value).toBe("");
  });
});
