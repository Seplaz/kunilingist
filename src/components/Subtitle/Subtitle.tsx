import styles from './Subtitle.module.css';

type Props = { subtitle: string; delayMs?: number };

type CSSVars = React.CSSProperties & {
  ['--d']?: string;
};

export const Subtitle = ({ subtitle, delayMs = 0 }: Props) => {
  return (
    <h2 className={styles.subtitle} style={{ '--d': `${delayMs}ms` } as CSSVars}>
      {subtitle}
    </h2>
  );
};