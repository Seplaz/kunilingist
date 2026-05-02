import { useEffect, useState } from 'react';
import styles from './Loading.module.css';
import loading from '/icons/loading.svg';

type Props = {
  minDurationMs?: number;
  preloadImages?: string[];
  onFinished?: () => void;
};

export const Loading = ({ minDurationMs = 600, preloadImages = [], onFinished }: Props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();

    const finish = () => {
      const elapsed = performance.now() - startedAt;
      const rest = Math.max(0, minDurationMs - elapsed);
      window.setTimeout(() => setHidden(true), rest);
    };

    const preload = () => {
      if (preloadImages.length === 0) {
        finish();
        return;
      }
      let loaded = 0;
      preloadImages.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded += 1;
          if (loaded === preloadImages.length) finish();
        };
        img.src = src;
      });
    };

    if (document.readyState === 'complete') {
      preload();
      return;
    }

    window.addEventListener('load', preload, { once: true });
    return () => window.removeEventListener('load', preload);
  }, [minDurationMs, preloadImages]);

  return (
    <div
      className={styles.overlay}
      data-hidden={hidden ? 'true' : 'false'}
      onTransitionEnd={() => {
        if (hidden) onFinished?.();
      }}
      aria-hidden="true"
    >
      <img src={loading} alt="Загрузка..." />
    </div>
  );
};

