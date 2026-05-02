import React from 'react';
import styles from './Title.module.css';

type CSSVars = React.CSSProperties & {
  ['--d']?: string;
  ['--base']?: string;
};

type Props = {
  title: string;
  stackedWords?: boolean;
  baseDelayMs?: number;
  page?: string;
};

export const Title = ({ title, stackedWords = false, baseDelayMs = 200, page }: Props) => {
  const words = title.trim().split(/\s+/).filter(Boolean);

  return (
    <h1
      className={styles.title}
      data-stacked={stackedWords ? 'true' : 'false'}
      data-page={page}
      aria-label={title}
      style={{ '--base': `${baseDelayMs}ms` } as CSSVars}
    >
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span className={styles.word} style={{ '--d': `${i * 250}ms` } as CSSVars}>
            {w}
          </span>
          {!stackedWords && i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </h1>
  );
};