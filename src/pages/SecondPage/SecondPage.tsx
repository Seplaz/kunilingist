import styles from './SecondPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';

export const SecondPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
      <Title title={"НОВЫЙ СИНГЛ"} />
      <Subtitle subtitle={"2026"} />
      </div>
    </div>
  );
};
