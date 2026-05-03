import styles from './MerchItem.module.css';

type Props = {
  image: string;
  alt: string;
};

export const MerchItem = ({ image, alt }: Props) => {
  return (
    <div className={styles.item}>
      <img src={image} alt={alt} className={styles.image} />
      <button className={styles.btn} disabled aria-disabled="true">
        Недоступно
      </button>
    </div>
  );
};
