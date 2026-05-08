import styles from "./ScrollHint.module.css";
import arrowDown from "/icons/arrow_down.svg";

type Props = {
	delayMs?: number;
	active?: boolean;
	onClick?: () => void;
	hidden?: boolean;
};

export const ScrollHint = ({
	delayMs = 0,
	active = false,
	onClick,
	hidden = false,
}: Props) => {
	if (hidden) return null;

	return (
		<button
			type="button"
			className={styles.arrow}
			data-active={active}
			onClick={onClick}
			aria-label="Перейти к следующей секции"
			style={{ "--arrow-delay": `${delayMs}ms` } as React.CSSProperties}
		>
			<img src={arrowDown} alt="Вниз" />
		</button>
	);
};
