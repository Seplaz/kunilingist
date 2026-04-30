import './App.css';
import { useEffect, useMemo, useRef } from 'react';
import { FirstPage } from './pages/FirstPage/FirstPage';
import { SecondPage } from './pages/SecondPage/SecondPage';
import { ThirdPage } from './pages/ThirdPage/ThirdPage';

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const touchStartYRef = useRef(0);
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
      el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' });
    };
    const getActiveIndex = () => {
      const top = el.scrollTop;
      const h = el.clientHeight || 1;
      return Math.round(top / h);
    };
    const onWheel: EventListener = (event) => {
      const e = event as WheelEvent;

      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      scrollToIndex(getActiveIndex() + dir);

      window.setTimeout(() => (locked = false), 450);
    };
    const onTouchStart: EventListener = (event) => {
      const e = event as TouchEvent;
      touchStartYRef.current = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove: EventListener = (event) => {
      // На iOS Safari без этого жест может “утащить” контент,
      // оставляя реальный сдвиг (пустоту сверху/снизу).
      event.preventDefault();
    };
    const onTouchEnd: EventListener = (event) => {
      const e = event as TouchEvent;
      const endY = e.changedTouches[0]?.clientY ?? 0;
      const dy = endY - touchStartYRef.current;

      if (Math.abs(dy) < 40) return;
      const dir = dy < 0 ? 1 : -1;
      scrollToIndex(getActiveIndex() + dir);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className='screenScroller'>
      {pages.map((Page, i) => (
        <section
          key={i}
          ref={(node) => {
            sectionRefs.current[i] = node;
          }}
          className='screen'
        >
          {Page}
        </section>
      ))}
    </div>
  );
}
