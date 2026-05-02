import styles from './Scroll.module.css';

type Props = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const Scroll = ({ count, activeIndex, onSelect }: Props) => {
  return (
    <div className={styles.wrapper} aria-label="Навигация по секциям">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          className={styles.dot}
          data-active={i === activeIndex ? 'true' : 'false'}
          aria-label={`Перейти к секции ${i + 1}`}
          aria-current={i === activeIndex ? 'true' : undefined}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
};

