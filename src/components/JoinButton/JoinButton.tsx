import styles from "./JoinButton.module.css";

type CSSVars = React.CSSProperties & {
	["--d"]?: string;
};

type Props = {
	href: string;
	label?: string;
	delayMs?: number;
	active?: boolean;
};

export const JoinButton = ({
	href,
	label = "Присоединиться",
	delayMs = 0,
	active = false,
}: Props) => {
	return (
		<a
			className={styles.button}
			data-active={active ? "true" : "false"}
			style={{ "--d": `${delayMs}ms` } as CSSVars}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			{label}
		</a>
	);
};
