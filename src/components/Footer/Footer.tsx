import logo from '../../../public/icons/logo.svg';
import heart from '../../../public/icons/heart.svg';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>Все права слизаны © 2026</p>
        <div className={styles.footer__icons}>
          <p className={styles.footer__text}>From</p>
          <img src={logo} alt="logo" />
          <p className={styles.footer__text}>with</p>
          <img src={heart} alt="heart" />
        </div>
      </div>
    </footer>
  );
};