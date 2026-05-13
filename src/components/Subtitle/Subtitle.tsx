import React from 'react';
import styles from './Subtitle.module.css';

type CSSVars = React.CSSProperties & {
  '--d'?: string;
  '--base'?: string;
};

type Props = {
  subtitle: string | string[];
  delayMs?: number;
  lineStepMs?: number;
};

export const Subtitle = ({
  subtitle,
  delayMs = 0,
  lineStepMs = 250,
}: Props) => {
  const lines = Array.isArray(subtitle) ? subtitle : [subtitle];
  const ariaLabel = lines.join(' ');

  return (
    <h2
      className={styles.subtitle}
      aria-label={ariaLabel}
      style={{ '--base': `${delayMs}ms` } as CSSVars}
    >
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className={styles.line}
          style={{ '--d': `${i * lineStepMs}ms` } as CSSVars}
        >
          {line}
        </span>
      ))}
    </h2>
  );
};
