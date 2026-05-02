import './App.css';
import { FirstPage } from './pages/FirstPage/FirstPage';
import { SecondPage } from './pages/SecondPage/SecondPage';
import { ThirdPage } from './pages/ThirdPage/ThirdPage';
import { Scroll } from './components/Scroll/Scroll';
import { Loading } from './components/Loading/Loading';
import { useEffect, useRef, useState } from 'react';

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
        const next = Math.max(0, Math.min(pagesCount - 1, Math.round(el.scrollTop / h)));
        setActiveIndex(next);
      });
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, [pagesCount]);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const h = el.clientHeight;
    el.scrollTo({ top: h * index, behavior: 'smooth' });
  };

  return (
    <>
      {showLoading ? <Loading preloadImages={['/images/background.png']} onFinished={() => { setShowLoading(false); setLoadingDone(true); }} /> : null}
      <div className="scrollContainer" ref={containerRef}>
      <div className="section">
        <FirstPage active={activeIndex === 0 && loadingDone} />
      </div>
      <div className="section">
        <SecondPage active={activeIndex === 1} />
      </div>
      <div className="section">
        <ThirdPage active={activeIndex === 2} />
      </div>

      <Scroll count={pagesCount} activeIndex={activeIndex} onSelect={scrollToIndex} />
      </div>
    </>
  );
}
