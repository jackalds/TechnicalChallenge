import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
	it("renders with children", () => {
		render(<Badge>5</Badge>);
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("applies default variant by default", () => {
		const { container } = render(<Badge>Test</Badge>);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("badge", "default");
	});

	it("applies success variant", () => {
		const { container } = render(<Badge variant="success">Test</Badge>);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("badge", "success");
	});

	it("applies warning variant", () => {
		const { container } = render(<Badge variant="warning">Test</Badge>);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("badge", "warning");
	});

	it("applies error variant", () => {
		const { container } = render(<Badge variant="error">Test</Badge>);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("badge", "error");
	});

	it("applies info variant", () => {
		const { container } = render(<Badge variant="info">Test</Badge>);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("badge", "info");
	});

	it("applies custom className", () => {
		const { container } = render(<Badge className="custom-class">Test</Badge>);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("custom-class");
	});

	it("has aria-label for accessibility", () => {
		render(<Badge>5</Badge>);
		const badge = screen.getByLabelText("Badge: 5");
		expect(badge).toBeInTheDocument();
	});

	it("renders with React node as children", () => {
		render(
			<Badge>
				<span>Custom</span>
			</Badge>
		);
		expect(screen.getByText("Custom")).toBeInTheDocument();
	});
});
