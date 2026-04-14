import logo from '../../assets/logo.svg';
import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <div>
      <img className={styles.logo} src={logo} alt='Логотип Кунилингист' />
    </div>
  );
};
