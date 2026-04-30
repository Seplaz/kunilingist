import './App.css';
import { useEffect, useMemo, useRef } from 'react';
import { FirstPage } from './pages/FirstPage/FirstPage';
import { SecondPage } from './pages/SecondPage/SecondPage';
import { ThirdPage } from './pages/ThirdPage/ThirdPage';

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const pages = useMemo(
    () => [<FirstPage />, <SecondPage />, <ThirdPage />],
    [],
  );
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let locked = false;
    const scrollToIndex = (nextIndex: number) => {
      const clamped = Math.max(
        0,
        Math.min(sectionRefs.current.length - 1, nextIndex),
      );
      sectionRefs.current[clamped]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
    const getActiveIndex = () => {
      const top = el.scrollTop;
      const h = el.clientHeight || 1;
      return Math.round(top / h);
    };
    const onWheel: EventListener = (event) => {
      const e = event as WheelEvent;
      // трекпады могут давать очень мелкие значения — отсечём шум
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      scrollToIndex(getActiveIndex() + dir);
      // простая блокировка, чтобы не пролистывать 2-3 экрана за один жест
      window.setTimeout(() => (locked = false), 450);
    };
    let touchStartY = 0;
    const onTouchStart: EventListener = (event) => {
      const e = event as TouchEvent;
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd: EventListener = (event) => {
      const e = event as TouchEvent;
      const endY = e.changedTouches[0]?.clientY ?? 0;
      const dy = endY - touchStartY;
      // порог, чтобы случайные касания не листали
      if (Math.abs(dy) < 40) return;
      const dir = dy < 0 ? 1 : -1; // свайп вверх -> следующая секция
      scrollToIndex(getActiveIndex() + dir);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className='reels'>
      {pages.map((Page, i) => (
        <section
          key={i}
          ref={(node) => {
            sectionRefs.current[i] = node;
          }}
          className='reel'
        >
          {Page}
        </section>
      ))}
    </div>
  );
}
