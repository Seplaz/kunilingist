import styles from './Title.module.css';

type CSSVars = React.CSSProperties & {
  ['--d']?: string;
};

export const Title = ({ title }: { title: string }) => {
  const words = title.trim().split(/\s+/).filter(Boolean);

  return (
    <h1 className={styles.title} aria-label={title}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={styles.word}
          style={{ '--d': `${i * 250}ms` } as CSSVars}
        >
          {w}
        </span>
      ))}
    </h1>
  );
};