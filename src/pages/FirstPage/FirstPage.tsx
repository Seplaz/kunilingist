import styles from './FirstPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import arrowDown from '/icons/arrow_down.svg';

type Props = { active: boolean };

export const FirstPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const title = 'ПРЕВОСХОДНОЕ ВЛАДЕНИЕ ЯЗЫКОМ';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
        <Title title={title} stackedWords baseDelayMs={baseDelayMs} />
        <Subtitle
          subtitle='Искусство, от которого сводит ноги'
          delayMs={subtitleDelayMs}
        />
        <img
        className={styles.arrow}
        src={arrowDown}
        alt='Вниз'
        style={{ '--arrow-delay': '1450ms' } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
