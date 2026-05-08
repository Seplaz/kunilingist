import { useEffect, useState } from "react";
import styles from "./Loading.module.css";
import loading from "/icons/loading.svg";

type Props = {
	minDurationMs?: number;
	preloadImages?: string[];
	onFinished?: () => void;
};

export const Loading = ({
	minDurationMs = 600,
	preloadImages = [],
	onFinished,
}: Props) => {
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		let cancelled = false;
		let timeoutId: number | undefined;

		const startedAt = performance.now();

		const finish = () => {
			const elapsed = performance.now() - startedAt;
			const rest = Math.max(0, minDurationMs - elapsed);

			timeoutId = window.setTimeout(() => {
				if (!cancelled) {
					setHidden(true);
				}
			}, rest);
		};

		const preload = async () => {
			if (preloadImages.length === 0) {
				finish();
				return;
			}

			await Promise.all(
				preloadImages.map(
					(src) =>
						new Promise<void>((resolve) => {
							const img = new Image();
							img.onload = img.onerror = () => resolve();
							img.src = src;
						}),
				),
			);

			finish();
		};

		if (document.readyState === "complete") {
			preload();
		} else {
			window.addEventListener("load", preload, { once: true });
		}

		return () => {
			cancelled = true;
			if (timeoutId) clearTimeout(timeoutId);
			window.removeEventListener("load", preload);
		};
	}, [minDurationMs, preloadImages]);

	return (
		<div
			className={styles.overlay}
			data-hidden={hidden}
			role="status"
			aria-live="polite"
			aria-busy={!hidden}
		>
			<div
				className={styles.bg}
				onAnimationEnd={() => {
					if (hidden) onFinished?.();
				}}
			/>
			<img src={loading} alt="Загрузка..." className={styles.icon} />
		</div>
	);
};
