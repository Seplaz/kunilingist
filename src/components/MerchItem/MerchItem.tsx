import styles from './MerchItem.module.css';

type CSSVars = React.CSSProperties & {
  ['--d']?: string;
};

type Props = {
  image: string;
  alt: string;
  delayMs?: number;
  active?: boolean;
};

export const MerchItem = ({ image, alt, delayMs = 0, active = false }: Props) => {
  return (
    <div
      className={styles.item}
      data-active={active ? 'true' : 'false'}
      style={{ '--d': `${delayMs}ms` } as CSSVars}
    >
      <img src={image} alt={alt} className={styles.image} />
      <button className={styles.btn} disabled aria-disabled="true">
        Недоступно
      </button>
    </div>
  );
};
