import styles from './JoinButton.module.css';

type CSSVars = React.CSSProperties & {
  ['--d']?: string;
};

type Props = {
  href: string;
  label?: string;
  delayMs?: number;
  active?: boolean;
};

export const JoinButton = ({ href, label = 'Присоединиться', delayMs = 0, active = false }: Props) => {
  return (
    <div data-active={active ? 'true' : 'false'} style={{ '--d': `${delayMs}ms` } as CSSVars}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        {label}
      </a>
    </div>
  );
};
