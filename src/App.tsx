import "./App.css";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { FirstPage } from "./pages/FirstPage/FirstPage";
import { Scroll } from "./components/Scroll/Scroll";
import { Loading } from "./components/Loading/Loading";

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
  const [showLoading, setShowLoading] = useState(true);
  const [loadingDone, setLoadingDone] = useState(false);

  const pagesCount = 3;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = el.clientHeight || 1;
        const next = Math.max(
          0,
          Math.min(pagesCount - 1, Math.round(el.scrollTop / h)),
        );
        setActiveIndex(next);
      });
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [pagesCount]);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const h = el.clientHeight;
    el.scrollTo({ top: h * index, behavior: "smooth" });
  };

  return (
    <>
      {showLoading ? (
        <Loading
          preloadImages={["/images/pages/page_1/background.png"]}
          onFinished={() => {
            setShowLoading(false);
            setLoadingDone(true);
          }}
        />
      ) : null}
      <div className="scrollContainer" ref={containerRef}>
        <Suspense fallback={<Loading />}>
          <div className="section">
            <FirstPage active={activeIndex === 0 && loadingDone} />
          </div>
          <div className="section">
            <SecondPage active={activeIndex === 1} />
          </div>
          <div className="section">
            <ThirdPage active={activeIndex === 2} />
          </div>
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
