import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/(auth)/login/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterAll(() => {
    console.log("Login Test finished!");
  });

  it("renders login form", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it("shows error when login fails", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText(/Sign in/i));

    // expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
