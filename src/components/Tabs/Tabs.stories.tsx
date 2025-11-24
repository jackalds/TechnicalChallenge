import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A fully accessible Tabs component with support for multiple variants and badges. The component follows WAI-ARIA patterns for keyboard navigation and screen reader support.",
			},
		},
		pseudoStates: {
			selector: "button[role='tab']",
			prefix: "pseudo-states--",
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["pill", "underline"],
			description: "The visual style variant of the tabs",
		},
		defaultSelectedId: {
			control: "text",
			description: "The initially selected tab ID",
		},
		onTabChange: {
			action: "tab changed",
			description: "Callback fired when the selected tab changes",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const basicItems = [
	{
		id: "tab-1",
		label: "Overview",
		content: (
			<div>
				<h3>Overview Content</h3>
				<p>This is the overview tab content. Here you can see general information.</p>
			</div>
		),
	},
	{
		id: "tab-2",
		label: "Details",
		content: (
			<div>
				<h3>Details Content</h3>
				<p>This is the details tab content. Here you can see detailed information.</p>
			</div>
		),
	},
	{
		id: "tab-3",
		label: "Settings",
		content: (
			<div>
				<h3>Settings Content</h3>
				<p>This is the settings tab content. Here you can configure options.</p>
			</div>
		),
	},
];

export const PillVariant: Story = {
	args: {
		items: basicItems,
		variant: "pill",
	},
};

export const UnderlineVariant: Story = {
	args: {
		items: basicItems,
		variant: "underline",
	},
};

export const PillWithBadges: Story = {
	args: {
		items: [
			{
				id: "tab-1",
				label: "Inbox",
				badge: "12",
				badgeVariant: "natural",
				content: (
					<div>
						<h3>Inbox</h3>
						<p>You have 12 unread messages.</p>
					</div>
				),
			},
			{
				id: "tab-2",
				label: "Sent",
				badge: "5",
				badgeVariant: "positive",
				content: (
					<div>
						<h3>Sent</h3>
						<p>You have 5 sent messages.</p>
					</div>
				),
			},
			{
				id: "tab-3",
				label: "Drafts",
				badge: "3",
				badgeVariant: "negative",
				content: (
					<div>
						<h3>Drafts</h3>
						<p>You have 3 draft messages.</p>
					</div>
				),
			},
		],
		variant: "pill",
	},
};

export const UnderlineWithBadges: Story = {
	args: {
		items: [
			{
				id: "tab-1",
				label: "Default Badge",
				badge: "5",
				badgeVariant: "natural",
				content: <div>Content with default badge variant</div>,
			},
			{
				id: "tab-2",
				label: "Success Badge",
				badge: "✓",
				badgeVariant: "positive",
				content: <div>Content with success badge variant</div>,
			},
			{
				id: "tab-3",
				label: "Warning Badge",
				badge: "!",
				badgeVariant: "negative",
				content: <div>Content with warning badge variant</div>,
			},
		],
		variant: "underline",
	},
};

export const WithDisabledTabs: Story = {
	args: {
		items: [
			{
				id: "tab-1",
				label: "Active Tab",
				content: <div>This tab is active and enabled.</div>,
			},
			{
				id: "tab-2",
				label: "Disabled Tab",
				disabled: true,
				content: <div>This tab is disabled.</div>,
			},
			{
				id: "tab-3",
				label: "Another Active Tab",
				content: <div>This tab is also active and enabled.</div>,
			},
		],
		variant: "pill",
	},
};

export const Controlled: Story = {
	args: {
		items: basicItems,
		variant: "pill",
		selectedId: "tab-2",
	},
	render: (args) => {
		const [selectedId, setSelectedId] = React.useState(args.selectedId || "tab-1");
		return (
			<div>
				<Tabs {...args} selectedId={selectedId} onTabChange={setSelectedId} />
				<div style={{ marginTop: "1rem", padding: "1rem", background: "#f3f4f6", borderRadius: "0.5rem" }}>
					<p>
						Current selected tab: <strong>{selectedId}</strong>
					</p>
				</div>
			</div>
		);
	},
};

export const LongContent: Story = {
	args: {
		items: [
			{
				id: "tab-1",
				label: "Short",
				content: <div>Short content</div>,
			},
			{
				id: "tab-2",
				label: "Very Long Tab Label That Might Overflow",
				content: <div>Content for a tab with a very long label</div>,
			},
			{
				id: "tab-3",
				label: "Medium Length Tab",
				content: <div>Content for medium length tab</div>,
			},
		],
		variant: "pill",
	},
};

export const ManyTabs: Story = {
	args: {
		items: Array.from({ length: 8 }, (_, i) => ({
			id: `tab-${i + 1}`,
			label: `Tab ${i + 1}`,
			badge: i % 3 === 0 ? String(i + 1) : undefined,
			badgeVariant: (["natural", "positive", "negative"] as const)[i % 3],
			content: <div>Content for Tab {i + 1}</div>,
		})),
		variant: "pill",
	},
};

export const ActiveState: Story = {
	args: {
		items: basicItems,
		variant: "pill",
		defaultSelectedId: "tab-2",
	},
	parameters: {
		docs: {
			description: {
				story: "Demonstrates the active/selected state. The second tab is pre-selected to show the active styling.",
			},
		},
	},
};

export const ActiveStateUnderline: Story = {
	args: {
		items: basicItems,
		variant: "underline",
		defaultSelectedId: "tab-2",
	},
	play: async ({ canvasElement }) => {
		// Wait for the component to render
		await new Promise((resolve) => setTimeout(resolve, 100));
		// Find the second tab button and focus it
		const tabs = canvasElement.querySelectorAll('[role="tab"]');
		if (tabs[1] instanceof HTMLElement) {
			tabs[1].click();
		}
	},
	parameters: {
		docs: {
			description: {
				story: "Demonstrates the active/selected state with underline variant. The second tab is pre-selected to show the active styling.",
			},
		},
	},
};

export const FocusedState: Story = {
	args: {
		items: basicItems,
		variant: "pill",
		defaultSelectedId: "tab-1",
	},
	play: async ({ canvasElement }) => {
		// Wait for the component to render
		await new Promise((resolve) => setTimeout(resolve, 100));
		// Find the second tab button and focus it
		const tabs = canvasElement.querySelectorAll('[role="tab"]');
		if (tabs[1] instanceof HTMLElement) {
			tabs[1].focus();
		}
	},
	parameters: {
		docs: {
			description: {
				story: "Demonstrates the focused state. The second tab will be focused to show the focus-visible styling.",
			},
		},
	},
};

export const FocusedStateUnderline: Story = {
	args: {
		items: basicItems,
		variant: "underline",
		defaultSelectedId: "tab-1",
	},
	play: async ({ canvasElement }) => {
		// Wait for the component to render
		await new Promise((resolve) => setTimeout(resolve, 100));
		// Find the second tab button and focus it
		const tabs = canvasElement.querySelectorAll('[role="tab"]');
		if (tabs[1] instanceof HTMLElement) {
			tabs[1].focus();
		}
	},
	parameters: {
		docs: {
			description: {
				story: "Demonstrates the focused state with underline variant. The second tab will be focused to show the focus-visible styling.",
			},
		},
	},
};

export const ActiveAndFocusedState: Story = {
	args: {
		items: basicItems,
		variant: "pill",
		defaultSelectedId: "tab-2",
	},
	play: async ({ canvasElement }) => {
		// Wait for the component to render
		await new Promise((resolve) => setTimeout(resolve, 100));
		// Find the active tab (second tab) and focus it to show both states
		const tabs = canvasElement.querySelectorAll('[role="tab"]');
		if (tabs[1] instanceof HTMLElement) {
			tabs[1].focus();
		}
	},
	parameters: {
		docs: {
			description: {
				story: "Demonstrates both active and focused states together. The second tab is selected and focused to show how both states appear simultaneously.",
			},
		},
	},
};
