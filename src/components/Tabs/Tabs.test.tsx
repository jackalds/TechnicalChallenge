import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, type TabsItem } from "./Tabs";

const mockItems = [
	{
		id: "tab-1",
		label: "Tab 1",
		content: <div>Content 1</div>,
	},
	{
		id: "tab-2",
		label: "Tab 2",
		content: <div>Content 2</div>,
	},
	{
		id: "tab-3",
		label: "Tab 3",
		content: <div>Content 3</div>,
	},
];

describe("Tabs", () => {
	it("renders all tabs", () => {
		render(<Tabs items={mockItems} />);
		expect(screen.getByText("Tab 1")).toBeInTheDocument();
		expect(screen.getByText("Tab 2")).toBeInTheDocument();
		expect(screen.getByText("Tab 3")).toBeInTheDocument();
	});

	it("renders the first tab content by default", () => {
		render(<Tabs items={mockItems} />);
		expect(screen.getByText("Content 1")).toBeInTheDocument();
		expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
	});

	it("renders the default selected tab content", () => {
		render(<Tabs items={mockItems} defaultSelectedId="tab-2" />);
		expect(screen.getByText("Content 2")).toBeInTheDocument();
		expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
	});

	it("switches tab content when clicking a tab", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} />);

		const tab2 = screen.getByRole("tab", { name: "Tab 2" });
		await user.click(tab2);

		expect(screen.getByText("Content 2")).toBeInTheDocument();
		expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
	});

	it("calls onTabChange when a tab is clicked", async () => {
		const user = userEvent.setup();
		const onTabChange = vi.fn();
		render(<Tabs items={mockItems} onTabChange={onTabChange} />);

		const tab2 = screen.getByRole("tab", { name: "Tab 2" });
		await user.click(tab2);

		expect(onTabChange).toHaveBeenCalledWith("tab-2");
	});

	it("applies selected state to the active tab", () => {
		render(<Tabs items={mockItems} defaultSelectedId="tab-2" />);
		const tab2 = screen.getByRole("tab", { name: "Tab 2" });
		expect(tab2).toHaveAttribute("aria-selected", "true");
	});

	it("applies unselected state to inactive tabs", () => {
		render(<Tabs items={mockItems} defaultSelectedId="tab-2" />);
		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		const tab3 = screen.getByRole("tab", { name: "Tab 3" });
		expect(tab1).toHaveAttribute("aria-selected", "false");
		expect(tab3).toHaveAttribute("aria-selected", "false");
	});

	it("renders tabs with badges", () => {
		const itemsWithBadges: TabsItem[] = [
			{
				id: "tab-1",
				label: "Tab 1",
				badge: "5",
				content: <div>Content 1</div>,
			},
			{
				id: "tab-2",
				label: "Tab 2",
				badge: "10",
				badgeVariant: "success",
				content: <div>Content 2</div>,
			},
		];

		render(<Tabs items={itemsWithBadges} />);
		expect(screen.getByText("5")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
	});

	it("disables a tab when disabled prop is true", () => {
		const itemsWithDisabled = [
			...mockItems,
			{
				id: "tab-4",
				label: "Tab 4",
				disabled: true,
				content: <div>Content 4</div>,
			},
		];

		render(<Tabs items={itemsWithDisabled} />);
		const disabledTab = screen.getByRole("tab", { name: "Tab 4" });
		expect(disabledTab).toHaveAttribute("aria-disabled", "true");
		expect(disabledTab).toBeDisabled();
	});

	it("does not switch to disabled tab when clicked", async () => {
		const user = userEvent.setup();
		const itemsWithDisabled = [
			...mockItems,
			{
				id: "tab-4",
				label: "Tab 4",
				disabled: true,
				content: <div>Content 4</div>,
			},
		];

		render(<Tabs items={itemsWithDisabled} defaultSelectedId="tab-1" />);
		const disabledTab = screen.getByRole("tab", { name: "Tab 4" });
		await user.click(disabledTab);

		expect(screen.getByText("Content 1")).toBeInTheDocument();
		expect(screen.queryByText("Content 4")).not.toBeInTheDocument();
	});

	it("supports keyboard navigation with ArrowRight", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} defaultSelectedId="tab-1" />);

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		tab1.focus();

		await user.keyboard("{ArrowRight}");

		const tab2 = screen.getByRole("tab", { name: "Tab 2" });
		expect(tab2).toHaveAttribute("aria-selected", "true");
		expect(screen.getByText("Content 2")).toBeInTheDocument();
	});

	it("supports keyboard navigation with ArrowLeft", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} defaultSelectedId="tab-2" />);

		const tab2 = screen.getByRole("tab", { name: "Tab 2" });
		tab2.focus();

		await user.keyboard("{ArrowLeft}");

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		expect(tab1).toHaveAttribute("aria-selected", "true");
	});

	it("wraps around when navigating with ArrowRight at the end", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} defaultSelectedId="tab-3" />);

		const tab3 = screen.getByRole("tab", { name: "Tab 3" });
		tab3.focus();

		await user.keyboard("{ArrowRight}");

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		expect(tab1).toHaveAttribute("aria-selected", "true");
	});

	it("wraps around when navigating with ArrowLeft at the beginning", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} defaultSelectedId="tab-1" />);

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		tab1.focus();

		await user.keyboard("{ArrowLeft}");

		const tab3 = screen.getByRole("tab", { name: "Tab 3" });
		expect(tab3).toHaveAttribute("aria-selected", "true");
	});

	it("supports Home key to jump to first tab", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} defaultSelectedId="tab-3" />);

		const tab3 = screen.getByRole("tab", { name: "Tab 3" });
		tab3.focus();

		await user.keyboard("{Home}");

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		expect(tab1).toHaveAttribute("aria-selected", "true");
	});

	it("supports End key to jump to last tab", async () => {
		const user = userEvent.setup();
		render(<Tabs items={mockItems} defaultSelectedId="tab-1" />);

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		tab1.focus();

		await user.keyboard("{End}");

		const tab3 = screen.getByRole("tab", { name: "Tab 3" });
		expect(tab3).toHaveAttribute("aria-selected", "true");
	});

	it("skips disabled tabs in keyboard navigation", async () => {
		const user = userEvent.setup();
		const itemsWithDisabled = [
			{
				id: "tab-1",
				label: "Tab 1",
				content: <div>Content 1</div>,
			},
			{
				id: "tab-2",
				label: "Tab 2",
				disabled: true,
				content: <div>Content 2</div>,
			},
			{
				id: "tab-3",
				label: "Tab 3",
				content: <div>Content 3</div>,
			},
		];

		render(<Tabs items={itemsWithDisabled} defaultSelectedId="tab-1" />);

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		tab1.focus();

		await user.keyboard("{ArrowRight}");

		const tab3 = screen.getByRole("tab", { name: "Tab 3" });
		expect(tab3).toHaveAttribute("aria-selected", "true");
	});

	it("applies variant class", () => {
		const { container } = render(<Tabs items={mockItems} variant="pills" />);
		const tabsContainer = container.querySelector(".tabs");
		expect(tabsContainer).toHaveClass("pills");
	});

	it("has proper ARIA attributes", () => {
		render(<Tabs items={mockItems} />);
		const tablist = screen.getByRole("tablist");
		expect(tablist).toBeInTheDocument();

		const tab1 = screen.getByRole("tab", { name: "Tab 1" });
		const panel1 = screen.getByRole("tabpanel");

		expect(tab1).toHaveAttribute("aria-controls");
		expect(panel1).toHaveAttribute("aria-labelledby");
	});

	it("supports controlled mode", async () => {
		const user = userEvent.setup();
		const ControlledTabs = () => {
			const [selectedId, setSelectedId] = React.useState("tab-1");
			return <Tabs items={mockItems} selectedId={selectedId} onTabChange={setSelectedId} />;
		};

		render(<ControlledTabs />);
		expect(screen.getByText("Content 1")).toBeInTheDocument();

		const tab2 = screen.getByRole("tab", { name: "Tab 2" });
		await user.click(tab2);

		expect(screen.getByText("Content 2")).toBeInTheDocument();
	});

	it("renders with custom className", () => {
		const { container } = render(<Tabs items={mockItems} className="custom-tabs" />);
		const tabsContainer = container.querySelector(".tabs");
		expect(tabsContainer).toHaveClass("custom-tabs");
	});
});
