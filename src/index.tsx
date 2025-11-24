import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Tabs, type TabsItem } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const tabsItems: TabsItem[] = [
	{
		id: "overview",
		label: "Overview",
		content: (
			<div>
				<h2>Overview</h2>
				<p>Welcome to the Tabs component demo. This is the overview tab.</p>
			</div>
		),
	},
	{
		id: "details",
		label: "Badge",
		badge: "Badge",
		badgeVariant: "positive",
		content: (
			<div>
				<h2>Details</h2>
				<p>This tab shows detailed information. Notice the badge on the tab label.</p>
			</div>
		),
	},
	{
		id: "settings",
		label: "Settings",
		badge: "Badge",
		badgeVariant: "negative",
		content: (
			<div>
				<h2>Settings</h2>
				<p>Configure your settings here. This tab also has a badge.</p>
			</div>
		),
	},
];

root.render(
	<React.StrictMode>
		<div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
			<h1 style={{ marginBottom: "2rem" }}>Tabs Component Demo</h1>
			<Tabs items={tabsItems} variant="pill" />
		</div>
	</React.StrictMode>
);
