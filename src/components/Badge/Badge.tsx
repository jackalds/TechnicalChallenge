import React from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "natural" | "positive" | "negative";

export interface BadgeProps {
	/**
	 * The content to display inside the badge
	 */
	children: React.ReactNode;
	/**
	 * The variant style of the badge
	 * @default "default"
	 */
	variant?: BadgeVariant;
	/**
	 * Additional CSS class name
	 */
	className?: string;
}

/**
 * Badge component for displaying additional information
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
	return (
		<span className={`${styles.badge} ${styles[variant]} ${className}`} aria-label={`Badge: ${children}`}>
			{children}
		</span>
	);
};
