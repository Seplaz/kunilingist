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
    let snapTimer: number | undefined;
    const scrollToIndex = (nextIndex: number) => {
      const clamped = Math.max(
        0,
        Math.min(sectionRefs.current.length - 1, nextIndex),
      );
      el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' });
    };
    const snapToNearest = () => {
      const h = el.clientHeight || 1;
      const idx = Math.round(el.scrollTop / h);
      el.scrollTo({ top: idx * h, behavior: 'smooth' });
    };
    const scheduleSnap = (delayMs = 120) => {
      if (snapTimer) window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        snapToNearest();
      }, delayMs);
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
    const onScroll: EventListener = () => {
      // На iOS Safari после жеста прокрутки контейнер может
      // остаться в промежуточном положении — дотягиваем до ближайшего экрана.
      if (locked) return;
      scheduleSnap();
    };
    const onTouchEnd: EventListener = () => {
      if (locked) return;
      scheduleSnap(0);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      if (snapTimer) window.clearTimeout(snapTimer);
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
