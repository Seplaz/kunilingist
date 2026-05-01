import styles from './FirstPage.module.css';
import { Header } from '../../components/Header/Header';

export const FirstPage = () => {
  return (
    <div className={styles.page}>
      <Header />
    </div>
  );
};
