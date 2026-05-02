import styles from './Subtitle.module.css';

export const Subtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <h2 className={styles.subtitle}>{subtitle}</h2>
  );
};