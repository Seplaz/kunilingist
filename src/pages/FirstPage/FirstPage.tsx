import styles from './FirstPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';

export const FirstPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
      <Title title={"ПРЕВОСХОДНОЕ\nВЛАДЕНИЕ\nЯЗЫКОМ"} />
      <Subtitle subtitle={"Искусство, от которого сводит колени"} />
      </div>
    </div>
  );
};
