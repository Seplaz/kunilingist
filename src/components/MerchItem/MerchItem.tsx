import styles from "./MerchItem.module.css";

type CSSVars = React.CSSProperties & {
	"--d"?: string;
};

type Props = {
	image: string;
	alt: string;
	delayMs?: number;
	active?: boolean;
	available?: boolean;
	onClick?: () => void;
};

export const MerchItem = ({
	image,
	alt,
	delayMs = 0,
	active = false,
	available = false,
	onClick,
}: Props) => {
	return (
		<div
			className={styles.item}
			data-active={active}
			style={{ "--d": `${delayMs}ms` } as CSSVars}
		>
			<img
				src={image}
				alt={alt}
				className={styles.image}
				loading="lazy"
				decoding="async"
			/>

			<button
				className={styles.button}
				disabled={!available}
				onClick={available ? onClick : undefined}
				type="button"
			>
				{available ? "Купить" : "Недоступно"}
			</button>
		</div>
	);
};
