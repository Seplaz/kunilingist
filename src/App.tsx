import "./App.css";
import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Loading } from "./components/Loading/Loading";
import { Scroll } from "./components/Scroll/Scroll";
import { FirstPage } from "./pages/FirstPage/FirstPage";

const SecondPage = lazy(() =>
	import("./pages/SecondPage/SecondPage").then((module) => ({
		default: module.SecondPage,
	})),
);

const ThirdPage = lazy(() =>
	import("./pages/ThirdPage/ThirdPage").then((module) => ({
		default: module.ThirdPage,
	})),
);

export default function App() {
	const containerRef = useRef<HTMLDivElement>(null);

	const [activeIndex, setActiveIndex] = useState(0);
	const [loadingDone, setLoadingDone] = useState(false);

	const pages = [
		{ key: "first", Component: FirstPage },
		{ key: "second", Component: SecondPage },
		{ key: "third", Component: ThirdPage },
	];

	const pagesCount = pages.length;

	/* ---------------- Scroll Tracking ---------------- */

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		let raf = 0;

		const onScroll = () => {
			cancelAnimationFrame(raf);

			raf = requestAnimationFrame(() => {
				const h = el.clientHeight || 1;

				const next = Math.floor((el.scrollTop + h / 6) / h);

				const safeIndex = Math.max(0, Math.min(next, pagesCount - 1));

				setActiveIndex(safeIndex);
			});
		};

		onScroll();
		el.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			cancelAnimationFrame(raf);
			el.removeEventListener("scroll", onScroll);
		};
	}, [pagesCount]);

	/* ---------------- Scroll To Index ---------------- */

	const scrollToIndex = useCallback(
		(index: number) => {
			const el = containerRef.current;
			if (!el) return;

			const safeIndex = Math.max(0, Math.min(index, pagesCount - 1));
			const h = el.clientHeight;

			el.scrollTo({
				top: h * safeIndex,
				behavior: "smooth",
			});
		},
		[pagesCount],
	);

	/* ---------------- Render ---------------- */

	return (
		<>
			{!loadingDone && (
				<Loading
					preloadImages={["/images/pages/page_1/background.webp"]}
					onFinished={() => setLoadingDone(true)}
				/>
			)}

			<div className="scrollContainer" ref={containerRef}>
				<Suspense fallback={<Loading />}>
					{pages.map(({ key, Component }, index) => {
						const isActive =
							index === activeIndex && (index !== 0 || loadingDone);
						const hasNext = index < pagesCount - 1;

						return (
							<div key={key} className="section">
								<Component
									active={isActive}
									onNext={hasNext ? () => scrollToIndex(index + 1) : undefined}
								/>
							</div>
						);
					})}
				</Suspense>

				<Scroll
					count={pagesCount}
					activeIndex={activeIndex}
					onSelect={scrollToIndex}
				/>
			</div>
		</>
	);
}
