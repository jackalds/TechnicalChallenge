import React, { useState, useCallback, useRef, useEffect } from "react";
import { Tab, TabProps } from "./Tab";
import styles from "./Tabs.module.css";

export type TabsVariant = "underline" | "pill";

export interface TabsItem {
	/**
	 * Unique identifier for the tab
	 */
	id: string;
	/**
	 * Label to display in the tab
	 */
	label: React.ReactNode;
	/**
	 * Content to display in the tab panel
	 */
	content: React.ReactNode;
	/**
	 * Whether this tab is disabled
	 */
	disabled?: boolean;
	/**
	 * Badge content to display on the tab
	 */
	badge?: React.ReactNode;
	/**
	 * Badge variant style
	 */
	badgeVariant?: TabProps["badgeVariant"];
}

export interface TabsProps {
	/**
	 * Array of tab items to display
	 */
	items: TabsItem[];
	/**
	 * The variant style of the tabs
	 * @default "pill"
	 */
	variant?: TabsVariant;
	/**
	 * The initially selected tab ID
	 */
	defaultSelectedId?: string;
	/**
	 * Controlled selected tab ID
	 */
	selectedId?: string;
	/**
	 * Callback fired when the selected tab changes
	 */
	onTabChange?: (tabId: string) => void;
	/**
	 * Additional CSS class name
	 */
	className?: string;
	/**
	 * Unique identifier for the tabs component (for accessibility)
	 */
	id?: string;
}

/**
 * Tabs component for organizing content into multiple panels
 */
export const Tabs: React.FC<TabsProps> = ({
	items,
	variant = "pill",
	defaultSelectedId,
	selectedId: controlledSelectedId,
	onTabChange,
	className = "",
	id: tabsId,
}) => {
	const [internalSelectedId, setInternalSelectedId] = useState<string>(defaultSelectedId || items[0]?.id || "");
	const isControlled = controlledSelectedId !== undefined;
	const selectedId = isControlled ? controlledSelectedId : internalSelectedId;
	const tabListRef = useRef<HTMLDivElement>(null);
	const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

	const uniqueId = tabsId || `tabs-${React.useId()}`;

	const handleTabClick = useCallback(
		(tabId: string) => {
			if (!isControlled) {
				setInternalSelectedId(tabId);
			}
			onTabChange?.(tabId);
		},
		[isControlled, onTabChange]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (!tabListRef.current) return;

			const enabledTabs = items.filter((item) => !item.disabled);
			const currentIndex = enabledTabs.findIndex((item) => item.id === selectedId);

			let nextIndex = currentIndex;

			switch (event.key) {
				case "ArrowRight":
				case "ArrowDown":
					event.preventDefault();
					nextIndex = (currentIndex + 1) % enabledTabs.length;
					break;
				case "ArrowLeft":
				case "ArrowUp":
					event.preventDefault();
					nextIndex = currentIndex <= 0 ? enabledTabs.length - 1 : currentIndex - 1;
					break;
				case "Home":
					event.preventDefault();
					nextIndex = 0;
					break;
				case "End":
					event.preventDefault();
					nextIndex = enabledTabs.length - 1;
					break;
				default:
					return;
			}

			const nextTabId = enabledTabs[nextIndex]?.id;
			if (nextTabId) {
				handleTabClick(nextTabId);
				// Focus the next tab
				setTimeout(() => {
					const nextTab = tabRefs.current.get(nextTabId);
					nextTab?.focus();
				}, 0);
			}
		},
		[items, selectedId, handleTabClick]
	);

	// Set up tab refs
	useEffect(() => {
		items.forEach((item) => {
			const tabElement = document.getElementById(`${uniqueId}-tab-${item.id}`);
			if (tabElement instanceof HTMLButtonElement) {
				tabRefs.current.set(item.id, tabElement);
			}
		});
	}, [items, uniqueId]);

	const selectedItem = items.find((item) => item.id === selectedId);

	return (
		<div className={`${styles.tabs} ${styles[variant]} ${className}`}>
			<div ref={tabListRef} role="tablist" aria-label="Tabs" className={styles.tabList} onKeyDown={handleKeyDown}>
				{items.map((item) => (
					<Tab
						key={item.id}
						id={`${uniqueId}-tab-${item.id}`}
						label={item.label}
						isSelected={item.id === selectedId}
						disabled={item.disabled}
						onClick={() => handleTabClick(item.id)}
						badge={item.badge}
						badgeVariant={item.badgeVariant}
						aria-controls={`${uniqueId}-panel-${item.id}`}
					/>
				))}
			</div>
			{selectedItem && (
				<div
					id={`${uniqueId}-panel-${selectedItem.id}`}
					role="tabpanel"
					aria-labelledby={`${uniqueId}-tab-${selectedItem.id}`}
					className={styles.tabPanel}
					tabIndex={0}
				>
					{selectedItem.content}
				</div>
			)}
		</div>
	);
};
