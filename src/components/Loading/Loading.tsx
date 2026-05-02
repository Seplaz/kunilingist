import { useEffect, useState } from 'react';
import styles from './Loading.module.css';
import loading from '/icons/loading.svg';

type Props = {
  minDurationMs?: number;
  onFinished?: () => void;
};

export const Loading = ({ minDurationMs = 600, onFinished }: Props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();

    const finish = () => {
      const elapsed = performance.now() - startedAt;
      const rest = Math.max(0, minDurationMs - elapsed);
      window.setTimeout(() => setHidden(true), rest);
    };

    if (document.readyState === 'complete') {
      finish();
      return;
    }

    window.addEventListener('load', finish, { once: true });
    return () => window.removeEventListener('load', finish);
  }, [minDurationMs]);

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

