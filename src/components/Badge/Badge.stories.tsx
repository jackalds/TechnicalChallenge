import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	component: Badge,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component: "A Badge component used to display additional information, typically used within Tabs.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["natural", "positive", "negative"],
			description: "The visual style variant of the badge",
		},
		children: {
			control: "text",
			description: "The content to display inside the badge",
		},
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Natural: Story = {
	args: {
		children: "Badge",
		variant: "natural",
	},
};

export const Positive: Story = {
	args: {
		children: "Badge",
		variant: "positive",
	},
};

export const Negative: Story = {
	args: {
		children: "Badge",
		variant: "negative",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Badge variant="natural">Badge</Badge>
			<Badge variant="positive">Badge</Badge>
			<Badge variant="negative">Badge</Badge>
		</div>
	),
};

export const WithNumbers: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Badge variant="natural">1</Badge>
			<Badge variant="positive">+12</Badge>
			<Badge variant="negative">-99</Badge>
		</div>
	),
};
