import styles from './FirstPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';

type Props = { active: boolean };

export const FirstPage = ({ active }: Props) => {
  const title = 'ПРЕВОСХОДНОЕ ВЛАДЕНИЕ ЯЗЫКОМ';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = (wordsCount - 1) * 250 + 250;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
      <Title title={title} />
      <Subtitle subtitle="Искусство, от которого сводит колени" delayMs={subtitleDelayMs} />
      </div>
    </div>
  );
};
