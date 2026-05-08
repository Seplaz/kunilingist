import './App.css';
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { FirstPage } from './pages/FirstPage/FirstPage';
import { Scroll } from './components/Scroll/Scroll';
import { Loading } from './components/Loading/Loading';

const SecondPage = lazy(() =>
  import('./pages/SecondPage/SecondPage').then((module) => ({
    default: module.SecondPage,
  })),
);

const ThirdPage = lazy(() =>
  import('./pages/ThirdPage/ThirdPage').then((module) => ({
    default: module.ThirdPage,
  })),
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  const pages = [FirstPage, SecondPage, ThirdPage];
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

        const next = Math.floor((el.scrollTop + h / 2) / h);

        const safeIndex = Math.max(0, Math.min(next, pagesCount - 1));

        setActiveIndex(safeIndex);
      });
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
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
        behavior: 'smooth',
      });
    },
    [pagesCount],
  );

  /* ---------------- Render ---------------- */

  return (
    <>
      {!loadingDone && (
        <Loading
          preloadImages={['/images/pages/page_1/background.webp']}
          onFinished={() => setLoadingDone(true)}
        />
      )}

      <div className="scrollContainer" ref={containerRef}>
        <Suspense fallback={<Loading />}>
          {pages.map((Page, i) => {
            const isActive = i === activeIndex && (i !== 0 || loadingDone);
            const hasNext = i < pagesCount - 1;

            return (
              <div key={i} className="section">
                <Page
                  active={isActive}
                  onNext={hasNext ? () => scrollToIndex(i + 1) : undefined}
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