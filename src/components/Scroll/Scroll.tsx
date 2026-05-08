import React from "react";
import styles from "./Scroll.module.css";

type Props = {
	count: number;
	activeIndex: number;
	onSelect: (index: number) => void;
};

export const Scroll = React.memo(({ count, activeIndex, onSelect }: Props) => {
	if (count <= 1) return null;

	return (
		<div
			className={styles.wrapper}
			role="tablist"
			aria-label="Навигация по секциям"
		>
			{Array.from({ length: count }).map((_, i) => (
				<button
					key={i}
					type="button"
					role="tab"
					className={styles.dot}
					data-active={i === activeIndex}
					aria-label={`Перейти к секции ${i + 1}`}
					aria-selected={i === activeIndex}
					onClick={() => onSelect(i)}
				/>
			))}
		</div>
	);
});
