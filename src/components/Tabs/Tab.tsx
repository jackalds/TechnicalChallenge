import React from "react";
import { Badge, BadgeVariant } from "../Badge";
import styles from "./Tabs.module.css";

export interface TabProps {
	/**
	 * The unique identifier for this tab
	 */
	id: string;
	/**
	 * The label text to display in the tab
	 */
	label: React.ReactNode;
	/**
	 * Whether this tab is currently selected
	 */
	isSelected?: boolean;
	/**
	 * Whether this tab is disabled
	 */
	disabled?: boolean;
	/**
	 * Callback fired when the tab is clicked
	 */
	onClick?: () => void;
	/**
	 * Badge content to display on the tab
	 */
	badge?: React.ReactNode;
	/**
	 * Badge variant style
	 */
	badgeVariant?: BadgeVariant;
	/**
	 * Additional CSS class name
	 */
	className?: string;
	/**
	 * ARIA controls attribute - should match the id of the associated tab panel
	 */
	"aria-controls"?: string;
}

/**
 * Individual Tab component
 */
export const Tab: React.FC<TabProps> = ({
	id,
	label,
	isSelected = false,
	disabled = false,
	onClick,
	badge,
	badgeVariant = "natural",
	className = "",
	"aria-controls": ariaControls,
}) => {
	const handleClick = () => {
		if (!disabled && onClick) {
			onClick();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (disabled) return;

		// Handle Enter and Space keys
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick?.();
		}
	};

	return (
		<button
			id={id}
			role="tab"
			aria-selected={isSelected}
			aria-controls={ariaControls}
			aria-disabled={disabled}
			tabIndex={disabled ? -1 : isSelected ? 0 : -1}
			className={`${styles.tab} ${isSelected ? styles.selected : ""} ${disabled ? styles.disabled : ""} ${className}`}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			disabled={disabled}
		>
			<span className={styles.tabLabel}>{label}</span>
			{badge !== undefined && <Badge variant={badgeVariant}>{badge}</Badge>}
		</button>
	);
};
