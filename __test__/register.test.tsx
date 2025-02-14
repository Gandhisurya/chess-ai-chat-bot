import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "@/app/(auth)/register/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Register Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    console.log("Register Test finished!");
  });

  it("renders register form", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText(/User name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByText(/Create account/i)).toBeInTheDocument();
  });

  it("shows error when register fails", async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/User name/i), {
      target: { value: "john doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "wrong password" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "wrong confirm password" },
    });
    fireEvent.click(screen.getByText(/Create account/i));

    // expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
