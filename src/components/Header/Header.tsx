import styles from './Header.module.css';
import { Logo } from '../Logo/Logo';


export const Header = () => {
  return (
    <header className={styles.header}>
      {/* <div className={styles.header__left}></div> */}
      <Logo />
      {/* <div className={styles.header__right}></div> */}
    </header>
  );
};
