import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toast } from "../../presentation/components/ui/toast";

describe("Toast", () => {
  it("renders message and type correctly", () => {
    render(<Toast message="Test message" type="success" onClose={() => {}} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<Toast message="Test" type="info" onClose={onClose} />);
    
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose after timeout", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Test" type="error" onClose={onClose} />);
    
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
